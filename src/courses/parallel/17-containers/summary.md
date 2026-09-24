---
title: "Summary"
description: "Topic 17. Docker, Kubernetes, Aspire: conclusions and review questions"
sourceHash: "7dd72f3da0972372b01d82a94a302db01ee9bf9b6f6c47305828ee29bd052a0e"
---

# Summary

## Conclusions

Containers isolate processes with Linux kernel mechanisms (namespaces and cgroups) and start much faster than virtual machines, and an OCI image with layers works the same way in Docker, containerd, and Kubernetes. .NET images are built with a multi-stage `Dockerfile` or with the `dotnet publish /t:PublishContainer` command; a final image based on `aspnet` or a chiseled image is four to seven times smaller than an image with the SDK and runs as an unprivileged user. Docker Compose describes an environment of several services with networks, volumes, health checks, and scaling; for an application with a RabbitMQ broker, eight workers sped up the computation by a factor of 5.1. Kubernetes manages a cluster through desired state: a Deployment and a ReplicaSet maintain the number of pods and update them without downtime, a Service balances requests among ready pods, probes distinguish “live” from “ready”, HPA scales according to load, and a Job distributes batch computations. Aspire describes the application model in C# code, launches containers and projects with the correct connection strings, collects OpenTelemetry logs, metrics, and distributed traces in the dashboard, and can generate artifacts for Docker Compose and Kubernetes. The common rules are configuration in the environment, stateless processes, correct handling of `SIGTERM`, and idempotent operations.

## Self-check questions

1. How does a container differ from a virtual machine? Which Linux kernel mechanisms isolate it?
2. What are an image, a layer, and a registry? Why is the OCI standard needed?
3. Which `docker run` options publish a port, mount a volume, and pass an environment variable?
4. Why use a multi-stage build? Why are `COPY *.csproj` and `dotnet restore` executed before copying the rest of the code?
5. How do the `sdk`, `aspnet`, `runtime`, chiseled, and alpine images differ?
6. How do you build a .NET image without a `Dockerfile`? Which MSBuild properties are used for this?
7. How do Compose services find each other? Why are `healthcheck` and `depends_on` with `service_healthy` needed?
8. What happens to a container during `docker stop`? How should a worker handle `SIGTERM`?
9. Which components make up the Kubernetes control plane and a worker node?
10. How do Pod, ReplicaSet, and Deployment differ? How does a Service select pods?
11. What types of Service exist? What are ConfigMap and Secret used for?
12. How does a rolling update with `maxSurge` and `maxUnavailable` work? How do you perform a rollback?
13. How do `livenessProbe`, `readinessProbe`, and `startupProbe` differ?
14. What do `requests` and `limits` mean? What is `OOMKilled`?
15. How does HorizontalPodAutoscaler work? What does it need?
16. How does a Job differ from a Deployment? What do `parallelism` and `completionMode: Indexed` provide?
17. Which parts make up an Aspire solution? What do `WithReference`, `WaitFor`, and `WithReplicas` do?
18. What OpenTelemetry signals exist? How is the trace context passed through RabbitMQ?
19. How does `aspire publish` differ from `aspire deploy`?

## Useful links

- Docker documentation: <https://docs.docker.com/>
- Multi-stage builds: <https://docs.docker.com/build/building/multi-stage/>
- Compose reference: <https://docs.docker.com/reference/compose-file/services/>
- .NET container images: <https://learn.microsoft.com/dotnet/core/docker/container-images>
- Publishing a container with the .NET SDK: <https://learn.microsoft.com/dotnet/core/containers/sdk-publish>
- Kubernetes components: <https://kubernetes.io/docs/concepts/overview/components/>
- Deployment: <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>
- Service: <https://kubernetes.io/docs/concepts/services-networking/service/>
- Probes: <https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/>
- Job: <https://kubernetes.io/docs/concepts/workloads/controllers/job/>
- kind and a local registry: <https://kind.sigs.k8s.io/docs/user/local-registry/>
- Aspire: <https://aspire.dev/>
- Deploying Aspire to Kubernetes: <https://aspire.dev/deployment/kubernetes/clusters/>
- OpenTelemetry signals: <https://opentelemetry.io/docs/concepts/signals/>
- The twelve-factor app: <https://12factor.net/>
