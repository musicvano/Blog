---
title: "Observability, deployment, and practices"
description: "Topic 17. Docker, Kubernetes, Aspire: observability, deployment, and practices"
outline: [2, 3]
sourceHash: "8e88b883508fd49fcbc8345f5d261bb3cc5f7a60f02fd2cde197352f3a13c997"
---

# Observability, deployment, and practices

## Observability: OpenTelemetry

In a distributed system, one request passes through several processes, and the log of a single process is not enough. **OpenTelemetry** (<https://opentelemetry.io/docs/concepts/signals/>) is an open standard and a set of libraries for three **signals**:

- **logs** are structured `ILogger` records with a level, a template, and parameters;
- **metrics** are numeric series: counters and histograms (the number of requests, latency, Orleans grain activations from Topic 16);
- **traces** are a tree of **spans** for one request across all services; each span has a trace ID, a parent span, a start time, and a duration.

In .NET, tracing is built on `System.Diagnostics.Activity` (`ActivitySource`), and metrics on `System.Diagnostics.Metrics` (`Meter`). The trace context is passed between processes in headers: the HTTP `traceparent` header (the W3C Trace Context standard) and RabbitMQ message headers (`RabbitMQ.Client` 7 adds them itself). Data is sent over the **OTLP** protocol: Aspire sets the variables `OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_SERVICE_NAME`, and others for each project, and `AddServiceDefaults` enables the exporter only when the address is set (<https://aspire.dev/fundamentals/telemetry/>).

After one job with 40 chunks, the command `aspire otel traces api` showed a `POST /jobs` trace with 81 spans, and `aspire otel spans --trace-id …` showed its structure:

```
00:11:47.519 OK  29.57ms api: POST /jobs
00:11:47.539 OK   3.11ms api: publish primes
00:11:47.543 OK   0.06ms api: publish primes
…                                         (40 publish in total)
00:11:47.550 OK    0.11s worker-nqzwxwga: deliver primes
00:11:47.550 OK  93.36ms worker-euvtpmpg: deliver primes
00:11:47.550 OK  63.39ms worker-ugmdxbyv: deliver primes
…                                         (40 deliver in total)
00:11:49.711 OK    0.21s worker-ugmdxbyv: deliver primes
```

One trace covered the HTTP request to the API, 40 publications to RabbitMQ, and 40 deliveries processed in three worker processes: you can see how long each chunk took and which worker processed it. The *Traces* page of the dashboard presents the same information as a Gantt chart (Fig. 17.15), the *Metrics* page shows ASP.NET Core, HTTP client, and runtime metrics, and the *Structured logs* page shows the logs of all processes with filters.

::: info Screenshot
Aspire dashboard → Traces → trace «api: POST /jobs» opened: waterfall with the POST /jobs span, the publish primes spans and deliver primes spans of three worker resources
:::

Figure 17.15. A distributed trace API → RabbitMQ → worker {.caption}

## Deployment with Aspire

An AppHost describes not only local execution but also deployment (<https://aspire.dev/deployment/docker-compose/>):

- `aspire publish` generates artifacts for the target environment (Compose files, a Helm chart) with unfilled parameters;
- `aspire deploy` builds the images, fills in the parameters, and applies the deployment;
- `aspire destroy` removes what was deployed.

The target is set by a **compute environment** in the AppHost. For Docker Compose, this is the `Aspire.Hosting.Docker` package (13.5.4) and the line `builder.AddDockerComposeEnvironment("compose");`. The command `aspire publish -o out-compose` created `docker-compose.yaml` and `.env` with the parameters `API_IMAGE`, `RABBITMQ_PASSWORD`, `REDIS_PASSWORD`, and so on in 4 s; the services got the same `ConnectionStrings__…` variables, plus a dashboard container for telemetry. `aspire deploy -o out-compose` built the project images (`dotnet publish /t:PublishContainer`) in 41 s, ran `docker compose up`, and printed the addresses `api: http://localhost:56660` and the dashboard address. A job for $2 \cdot 10^{7}$ completed, but in 5.0 s, because the generated Compose file has **one** worker: `WithReplicas(3)` was not carried over.

For Kubernetes, you need the `Aspire.Hosting.Kubernetes` package (as of September 2026, only the preview version `13.5.4-preview.1.26464.4`) and an image registry accessible from both the PC and the nodes:

```cs
// Deployment target: a Kubernetes cluster (Helm) and an image registry.
#pragma warning disable ASPIRECOMPUTE003
var registry = builder.AddContainerRegistry("registry",
    "localhost:5001");
builder.AddKubernetesEnvironment("k8s")
    .WithContainerRegistry(registry);
```

`aspire publish -o out-k8s` creates a Helm chart (<https://helm.sh/docs/>): `Chart.yaml`, `values.yaml`, and Deployment, StatefulSet (for RabbitMQ and Redis), Service, ConfigMap, and Secret templates for each resource; the worker got `replicas: 3`. `aspire deploy` requires Helm 4.2 or newer (<https://aspire.dev/deployment/kubernetes/clusters/>): with Helm 4.3.0, it built the images in 46 s, pushed them to `localhost:5001`, and installed the `production` release into the `default` namespace of the current `kind-pro16` context. Via `kubectl port-forward svc/api-service 18080:8080`, a job for $2 \cdot 10^{7}$ completed in 1.9 s with three worker pods. `aspire destroy` removed the release.

The conclusion: Aspire is convenient for development and quick deployment, but the generated manifests are worth reviewing: they do not contain the probes, resources, and update strategy that are set explicitly in the handwritten manifests, and the Kubernetes target is still in preview.

## Practices for building containerized applications

The rules of the **twelve-factor app** (<https://12factor.net/>) and the experience of this lecture:

- **configuration in the environment**: connection strings, passwords, and addresses are passed in environment variables (`ConnectionStrings__…`), ConfigMaps, and Secrets rather than built into the image;
- **one image for all environments**: the same `primes-api:1.1` runs in development, testing, and production, and only the configuration changes; images have immutable tags;
- **stateless processes**: job state lives in Redis and messages in RabbitMQ, so any API or worker instance can be stopped or added;
- **fast startup and graceful shutdown**: handling `SIGTERM`, finishing the current work, and idempotent operations for redeliveries;
- **logs to stdout**: a container writes its log to standard output, and `docker logs`, `kubectl logs`, or OpenTelemetry collect it;
- **health checks**: separate “live” and “ready” endpoints;
- **minimal images and an unprivileged user**: multi-stage builds, chiseled images, `USER $APP_UID`, and regular updates of base images.

Table 17.4 compares the three tools of the lecture.

Table 17.4. Docker Compose, Kubernetes, and Aspire {.caption}

| **Property** | **Docker Compose** | **Kubernetes** | **Aspire** |
| --- | --- | --- | --- |
| description | `compose.yaml` | YAML manifests, Helm | C# code (AppHost) |
| nodes | one computer | cluster | developer PC; deployment to Compose or K8s |
| scaling | `--scale` | `replicas`, HPA | `WithReplicas` |
| self-healing | `restart` policy | controllers, probes | restarting resources from the dashboard |
| updates | recreating containers | rolling, rollback | via the deployment target |
| telemetry | separate | separate | dashboard and OpenTelemetry out of the box |

## Common mistakes

#[

Table 17.5. Common containerization and orchestration mistakes {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| `dotnet publish` in the `Dockerfile` fails with errors about `obj/project.assets.json` | the Windows `bin/` and `obj/` folders ended up in the build context; add a `.dockerignore` |
| the API container does not accept connections on port 80 | since .NET 8, ASP.NET Core in a container listens on 8080; publish `-p 8080:8080` |
| `ACCESS_REFUSED` from RabbitMQ from another container | the `guest` user works only from `localhost`; create a user with the `RABBITMQ_DEFAULT_USER`/`PASS` variables |
| the API starts before the broker and exits with an exception | `depends_on` with `condition: service_healthy` and a `healthcheck`; connection retries in the code (`Backend`) |
| `exec: "sh": executable file not found` | a chiseled image without a shell; debug with logs or temporarily build on `aspnet:10.0` |
| a pod in the `ImagePullBackOff`/`ErrImagePull` state | a wrong tag, or the registry is unreachable from the nodes; for kind, `hosts.toml` and `docker network connect kind pro16-registry` |
| after `docker push` with the same tag, pods run the old version | `IfNotPresent` takes the image from the node's cache; use a new tag for each build |
| RabbitMQ in `CrashLoopBackOff`: `.erlang.cookie: eacces` | an `exec` probe running as root created the file before the server; use a `tcpSocket` probe |
| request errors during a `rolling update` | the pod closes its port before it is removed from the service; `preStop` with a pause, `SIGTERM` handling |
| messages processed again after a worker stops | the channel was closed before the acknowledgment; wait for the current message, idempotent writes |
| HPA shows `cpu: <unknown>` | metrics-server is not installed, or kind lacks `--kubelet-insecure-tls`; `requests.cpu` is not set in the pod |
| Aspire: `Conflict. The container name "/pro16-redis" is already in use` | `WithContainerName` and a quick restart: the previous container is still being removed; wait a few seconds or do not set the name |
| Aspire: a resource is `Unhealthy`, `aspire otel` gives an SSL error | the developer certificate is not trusted; `aspire certs trust` or the `http` profile |

]
