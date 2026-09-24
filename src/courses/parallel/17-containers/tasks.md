---
title: "Tasks"
description: "Topic 17. Docker, Kubernetes, Aspire: task variants"
outline: [2, 3]
sourceHash: "cfa5486607eb5f088dc66076e4400b8e651f0c90b8c4c0b0229a63d917d1b914"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. A coffee shop order service {#v1}

**1. Initial level.** Create an ASP.NET Core web service that accepts coffee orders (`POST /orders` with a drink name) and returns an order number; write a multi-stage `Dockerfile`, build an image, run a container with a published port, and check the service with a `curl` request.

**2. Basic level.** Create a Docker Compose environment of the order service, a RabbitMQ broker, and a barista worker: the service publishes orders to a queue, and the worker “prepares” a drink for 1–3 s and records the status; the broker has a `healthcheck`, the services start after it is ready, and the request `GET /orders/{id}` returns the order status.

**3. Advanced level.** Create a Docker Compose environment for a coffee shop (an ASP.NET Core order web service, RabbitMQ, and barista workers that “prepare” a drink for 1–3 s and record the status) and a console program `coffee-load` with the options `--orders N`, `--url`, and `--help` that sends N orders and waits for them to be completed. Measure the time for 1, 2, 4, and 8 workers (`docker compose up --scale`), print a “workers – time – orders/s – speedup” table, and check stopping a worker in the middle of work for lost and duplicated orders; errors go to the error stream, exit codes 0/1/2.

### Variant 2. Photo processing {#v2}

**1. Initial level.** Create a console worker program that downscales an input image (or simulates processing by computing a file checksum) and prints the time; build an image on `runtime:10.0-noble-chiseled`, push it to the local registry `localhost:5001`, and run it in a kind cluster as a Deployment with one replica.

**2. Basic level.** In a kind cluster, create a Deployment of a “photo” processing web service (simulation: computing a convolution over a pixel array of a given size), a Service of type NodePort, and a HorizontalPodAutoscaler from 1 to 6 replicas based on CPU; use `kubectl get hpa -w` to check that the number of pods grows under load.

**3. Advanced level.** Deploy a “photo” processing web service (simulation: a convolution over a pixel array of a given size) in kind with a CPU-based HorizontalPodAutoscaler, and create a load-generating client `photo-load` with the options `--tasks`, `--seconds`, `--size`, and `--help` that calls the service and every 10 s prints the throughput, the latency, and the number of pods that responded. Run experiments with HPA targets of 50% and 80% and different `limits.cpu`, and summarize the results in a table and a CSV file for a chart.

### Variant 3. Distributed Monte Carlo {#v3}

**1. Initial level.** Create a console program that computes a part of the integral $\int_{0}^{1} \frac{4}{1 + x^{2}} d x$ with the Monte Carlo method for a part number given as an argument, build its image, and run the container three times with different part numbers.

**2. Basic level.** Run, as a Kubernetes indexed job (`completionMode: Indexed`, `completions: 8`), a container of a console program that computes a part of the integral $\int_{0}^{1} \frac{4}{1 + x^{2}} d x$ with the Monte Carlo method by part number (`JOB_COMPLETION_INDEX`); collect the results of the parts from the pod logs with the `kubectl logs` command and print the final value of $\pi$ and the error.

**3. Advanced level.** Create a program `mc-runner` with the options `--parts`, `--parallelism`, `--points`, and `--help` that generates a Kubernetes indexed Job manifest for a container that computes a part of the integral $\int_{0}^{1} \frac{4}{1 + x^{2}} d x$ with the Monte Carlo method by part number, applies it with `kubectl`, waits for completion, collects the results from the logs, and prints the value of $\pi$ and a “parallelism – time – speedup” table for 1, 2, 4, and 8 pods (median of three runs) with an explanation of the pod startup overhead.

### Variant 4. Orleans bank accounts {#v4}

**1. Initial level.** Create an Orleans silo with a bank account grain and a web endpoint `GET /accounts/{id}`, build an image, and run it in a Docker container with a published port.

**2. Basic level.** Create a Docker Compose environment of two Orleans silos with a bank account grain (the web endpoint `GET /accounts/{id}`), clustered through Redis, and Redis for grain state; check that after one silo container is stopped, the account balances are available through the other silo.

**3. Advanced level.** Deploy a cluster of Orleans silos with bank account grains to Kubernetes (a Deployment with 3 replicas, Redis for clustering and state, a Service) and write a client `bank-check` with the options `--accounts`, `--seconds`, and `--help` that continuously performs transfers between accounts and checks that the total sum is unchanged; delete a silo pod and print the duration of errors, the number of failed operations, and the final sum.

### Variant 5. A gRPC weather forecast {#v5}

**1. Initial level.** Create a gRPC weather forecast service (a unary call by city name) and a multi-stage `Dockerfile` for it; run the container and check the service with a console client.

**2. Basic level.** Build images of a gRPC weather forecast service (a unary call by city name) on `aspnet:10.0`, `aspnet:10.0-noble-chiseled`, and `aspnet:10.0-alpine`, compare the sizes (`docker images`), and deploy the chiseled variant to kind with `readinessProbe` and `livenessProbe` probes and a NodePort service.

**3. Advanced level.** Deploy a gRPC weather forecast service (a unary call by city name, with the version in the response) to kind and perform a rolling update from version 1.0 to 1.1 (`maxSurge: 1`, `maxUnavailable: 0`). With a client `weather-poll` with the options `--interval`, `--seconds`, and `--help`, call the service continuously and print the number of responses of each version and the number of errors; compare the results with and without `preStop`, and perform a `rollout undo`.

### Variant 6. A library catalog {#v6}

**1. Initial level.** Create an Aspire solution (AppHost and ServiceDefaults) with a book catalog web service that returns a list of books from memory, run it with the `aspire run` command, and show the resource in the dashboard.

**2. Basic level.** Create an Aspire solution (AppHost and ServiceDefaults) with a book catalog web service and a PostgreSQL resource (`AddPostgres`): the connection string is passed through `WithReference` and `WaitFor`, the books are stored in a database, and the service implements search by author. Check the traces of requests together with the database spans in the dashboard.

**3. Advanced level.** Create an Aspire solution with a book catalog web service (PostgreSQL) and a book lending service that calls the catalog through service discovery (`https+http://catalog`) and has a custom metric of the number of loans. Generate `aspire publish` output for Docker Compose, deploy the environment, and write a report comparing the generated `docker-compose.yaml` with a handwritten one.

### Variant 7. IoT telemetry {#v7}

**1. Initial level.** Create a console “sensor” that prints a random temperature every second, build an image, and run three containers with different sensor IDs set through an environment variable.

**2. Basic level.** Create a Docker Compose environment: sensors (a service with `--scale sensor=5`) publish readings to RabbitMQ, and an aggregator computes a per-minute average and writes it to Redis; the broker's and Redis's data is stored in named volumes and survives `docker compose down` and `up`.

**3. Advanced level.** Create a Docker Compose environment for IoT telemetry (sensors publish random temperatures to RabbitMQ, an aggregator computes a per-minute average and writes it to Redis, named volumes) and a recovery test script (PowerShell or a program `iot-chaos` with the options `--kill`, `--seconds`, and `--help`) that periodically stops a random aggregator or broker container. The report prints the number of sent, processed, and lost readings and the recovery time after each failure.

### Variant 8. A school timetable {#v8}

**1. Initial level.** Create a timetable web service that reads the school name and the number of lessons from environment variables, and run it in kind with a ConfigMap passed through `envFrom`.

**2. Basic level.** Create a timetable web service with the endpoint `GET /schedule/{class}` and deploy it to kind: the timetable is stored in a ConfigMap as a JSON file mounted into the pod as a volume, and the administrator password is stored in a Secret. Check that after changing the ConfigMap and running `kubectl rollout restart`, the service returns the new timetable.

**3. Advanced level.** Create a timetable web service (`GET /schedule/{class}`) deployed to kind with the timetable in a ConfigMap mounted as a file; the service reloads the configuration without restarting the pod (`reloadOnChange`) and keeps a log of changes. Create a program `schedule-check` with the options `--url`, `--expect`, and `--help` that measures how many seconds after `kubectl apply` the service starts returning the new timetable (5 measurements, the mean and the maximum).

### Variant 9. Fractal rendering {#v9}

**1. Initial level.** Create a console program that computes a fragment of the Mandelbrot set (a rectangle of pixels by tile number) and saves it to a PGM file; build an image and run a container with a volume for the result.

**2. Basic level.** Run, as a Kubernetes indexed job with `parallelism: 4`, a container of a program that computes a tile of the Mandelbrot set by number (16 tiles) and writes it to a PGM file on a shared PersistentVolumeClaim volume, and stitch the tiles into a complete image with a separate program.

**3. Advanced level.** Create a program `fractal-job` with the options `--width`, `--height`, `--tiles`, `--parallelism`, and `--help` that creates a Kubernetes indexed Job whose pods compute tiles of the Mandelbrot set onto a shared volume, waits for completion, assembles the image, and prints a timing table for different degrees of parallelism and tile sizes, explaining the effect of the uneven load of the tiles.

### Variant 10. A chat service {#v10}

**1. Initial level.** Create a chat web service with the endpoints `POST /messages` and `GET /messages` that stores messages in memory and returns the host name; run it in Docker and check it with several requests.

**2. Basic level.** Create a chat web service (`POST /messages`, `GET /messages`, with the host name in the response) and deploy it to kind with 3 replicas and a NodePort service; show that messages sent to different pods are “lost” when stored in memory, and move them to Redis so that all replicas see a shared history.

**3. Advanced level.** Deploy a chat web service (`POST /messages`, `GET /messages`, history in Redis, a response with the host name) to kind with several replicas, and create a client `chat-bots` with the options `--bots`, `--messages`, and `--help` that simulates concurrent users, checks the order and completeness of the history, and prints the distribution of requests among the pods; compare the results with and without keep-alive connections, and explain the service's load balancing.

### Variant 11. An auction {#v11}

**1. Initial level.** Create an Aspire solution with an auction web service (creating a lot and bids in memory), and show the resources, logs, and the trace of a `POST /bids` request in the dashboard.

**2. Basic level.** Create an Aspire solution with an auction web service (lots and bids), Redis, and RabbitMQ: bids are stored in Redis, and a “new bid” event is published to RabbitMQ and processed by a notification service; check the distributed trace from the bid to the notification in the dashboard.

**3. Advanced level.** Create an Aspire solution with an auction web service (lots and bids) with custom metrics via `IMeterFactory` (a bid counter, a histogram of amounts, the number of active lots) and a load-generating client `auction-bots` with the options `--bots`, `--seconds`, and `--help`. Write a report with the metric values from the dashboard and a check that the winning bid of each lot is the highest one.

### Variant 12. A movie theater {#v12}

**1. Initial level.** Create a movie theater showtimes web service with the endpoint `GET /version`, build two versions of the image (1.0 and 2.0) with different tags, and push them to the local registry.

**2. Basic level.** Implement a *blue-green* deployment of a movie theater showtimes web service with the endpoint `GET /version` in kind: two Deployments (`blue` with the version 1.0 image and `green` with 2.0) and a Service whose selector is switched with the `kubectl patch` command; check the instant switch and the switch back.

**3. Advanced level.** Deploy a movie theater web service with the endpoint `GET /version` in versions 1.0 and 2.0 to kind, and create a program `switch-check` with the options `--url`, `--seconds`, and `--help` that queries the service continuously while the versions are switched and prints the number of responses of each version and the number of errors. Compare a blue-green deployment (switching the Service selector) with a rolling update in terms of switchover time, errors, and required resources.

### Variant 13. Sorting large files {#v13}

**1. Initial level.** Create a console program that sorts a file of integers and writes the result; build an image and run a container with input and output data folders mounted as volumes.

**2. Basic level.** Implement external sorting of a file of integers in Kubernetes: an indexed job whose pods sort their parts of the file on a PersistentVolumeClaim volume, and a second job that merges the sorted parts; check that the result is sorted.

**3. Advanced level.** Create a program `sort-cluster` with the options `--size`, `--parts`, `--parallelism`, and `--help` that generates a file of random integers, runs a Kubernetes indexed job that sorts the parts on a PersistentVolumeClaim volume and a merge job, checks that the result is sorted, and prints a table of stage times for different numbers of parts and degrees of parallelism.

### Variant 14. Website monitoring {#v14}

**1. Initial level.** Create a console program that checks the availability of a list of URLs from an environment variable and prints the response code and time; run it as a Docker container.

**2. Basic level.** Run in kind, as a CronJob (every minute), a container of a program that checks the availability of a list of websites (response code and time), passing the list through a ConfigMap; view the results with the `kubectl logs` command for the job pods, and limit the history of finished jobs.

**3. Advanced level.** Create a website availability checker that runs in kind as a CronJob and stores the results (code, response time) in Redis, a report web service with the endpoint `GET /report` (availability and average time per hour for each website), and a program `monitor-report` with the options `--url`, `--format table|csv`, and `--help` that prints the report.

### Variant 15. A game server {#v15}

**1. Initial level.** Create a game room web service that stores the players' scores in a file in the `/data` folder, and run it as a container with a named volume; check that the data persists after the container is restarted.

**2. Basic level.** Create a game room web service that stores the players' scores in a file in the `/data` folder, and deploy it to kind first as a Deployment and then as a StatefulSet with `volumeClaimTemplates`; show that after a pod is deleted, the StatefulSet preserves the pod name and data, while a Deployment without a volume does not.

**3. Advanced level.** Deploy three game rooms (a web service that stores the players' scores in a file on a volume) to kind as a StatefulSet with a headless service, create a client `game-bots` with the options `--rooms`, `--players`, and `--help` that reaches the rooms by the stable DNS names of the pods, and write a report on state preservation after deleting pods and scaling.

### Variant 16. A medical reception desk {#v16}

**1. Initial level.** Create an Aspire solution with two web services, a reception desk and a doctors' schedule, that call each other through service discovery; show the calls in the dashboard.

**2. Basic level.** Create an Aspire solution for a medical reception desk: the reception web service publishes an appointment to RabbitMQ, and a worker confirms the appointment and stores it in Redis; check the distributed trace reception → RabbitMQ → worker in the dashboard.

**3. Advanced level.** Create an Aspire solution for a medical reception desk (a reception web service, RabbitMQ, and an appointment confirmation worker with Redis) with custom spans (`ActivitySource`) with doctor and patient attributes, a deliberate delay in the worker for some of the appointments, and a program `clinic-load` with the options `--requests` and `--help`; using `aspire otel` data, determine the slowest stage and explain the result.

### Variant 17. Comparing .NET images {#v17}

**1. Initial level.** Create a minimal ASP.NET Core web service and build its images on `aspnet:10.0` and `aspnet:10.0-noble-chiseled`; print their sizes with the `docker images` command.

**2. Basic level.** Build images of a minimal ASP.NET Core web service in four ways: single-stage on the SDK, multi-stage on `aspnet:10.0`, `dotnet publish /t:PublishContainer` with `ContainerFamily=noble-chiseled`, and Native AOT on `runtime-deps`; compare the image sizes and the numbers of layers.

**3. Advanced level.** Create a program `image-bench` with the options `--images`, `--runs`, and `--help` that, for each given image of a minimal ASP.NET Core web service with a `/health` endpoint (for example, on `aspnet:10.0`, chiseled, and Native AOT), measures the time from `docker run` to the first successful `/health` response and the memory consumption (`docker stats`), performs several runs, and prints a table of medians.

### Variant 18. Computing primes {#v18}

**1. Initial level.** Create a web service `GET /primes?to=N` that counts the number of primes below N, and deploy it to kind with CPU `requests`/`limits`.

**2. Basic level.** Deploy a web service `GET /primes?to=N` (the number of primes below N) to kind with CPU `requests`/`limits` and a HorizontalPodAutoscaler (from 1 to 8 replicas, a target of 60% CPU), install metrics-server, and check scaling under load with a console client with several parallel tasks.

**3. Advanced level.** Deploy a web service `GET /primes?to=N` to kind with a HorizontalPodAutoscaler, and create a client `primes-load` with the options `--tasks`, `--n`, `--seconds`, and `--help` that every 10 s prints the requests/s, the latency, and the number of pods; build a “time – replicas – throughput” table, and explain the effect of `stabilizationWindowSeconds` on reducing the number of pods.

### Variant 19. Delivery logistics {#v19}

**1. Initial level.** Create a `compose.yaml` with a parcel tracking service and Redis, pass the connection string through an environment variable, and check that the parcels are saved.

**2. Basic level.** Create a Docker Compose environment of a parcel tracking service with Redis and RabbitMQ with `dev` and `test` profiles: in `dev`, the ports of Redis and the RabbitMQ web console are published, and in `test`, a container with integration tests is run; all dependencies have a `healthcheck`, and the services start according to `depends_on` with the `service_healthy` condition.

**3. Advanced level.** Create a Docker Compose environment of a parcel tracking service with Redis and a test program `delivery-tests` with the options `--url` and `--help` that, in the `test` profile, checks creating, finding, and changing the status of parcels, returns exit code 0 or 1, and prints a table of passed tests; the environment is started with the command `docker compose --profile test up --abort-on-container-exit`.

### Variant 20. A vote counter {#v20}

**1. Initial level.** Create a voting web service with the endpoints `POST /vote/{option}` and `GET /results`, the endpoints `/health/live` and `/health/ready`, and storage in Redis.

**2. Basic level.** Deploy a voting web service (`POST /vote/{option}`, `GET /results`, storage in Redis) to kind with 3 replicas, with readiness (`/health/ready`, ready only when Redis is available) and liveness (`/health/live`) probes; show that when Redis is stopped, the pods are excluded from the service but not restarted.

**3. Advanced level.** Deploy a voting web service with Redis to kind and ensure zero downtime during an update: graceful shutdown on `SIGTERM`, `preStop`, and the `maxUnavailable: 0` strategy. Create a program `vote-bots` with the options `--rate`, `--seconds`, and `--help` that votes during the update, and a report comparing the votes sent and counted and the number of errors.

### Variant 21. Email campaigns {#v21}

**1. Initial level.** Create a console mailing worker that reads addresses from a RabbitMQ queue and “sends” emails (prints them to the log), build an image, and run it together with the broker in Compose.

**2. Basic level.** Deploy to kind, with `limits.memory: 64Mi`, a mailing worker that reads addresses from a RabbitMQ queue and “sends” emails (prints them to the log), with a mode that accumulates emails in memory; show the container terminating with the reason `OOMKilled` in `kubectl describe pod`, and find a limit at which the worker runs stably.

**3. Advanced level.** Deploy a mailing worker (it reads emails from a RabbitMQ queue and “sends” them to the log) to kind, and create a program `mail-load` with the options `--messages`, `--size`, and `--help` that publishes emails. Measure the worker's throughput for different `limits.cpu` (250m, 500m, 1) and `limits.memory`; print a table and the recommended `requests`/`limits` values.

### Variant 22. Sports statistics {#v22}

**1. Initial level.** Create an Aspire solution with a match statistics web service and Redis for caching, run it, and show the resources in the dashboard.

**2. Basic level.** Create an Aspire solution with a match statistics web service, Redis for caching, and a Kubernetes target (`AddKubernetesEnvironment` with the `localhost:5001` registry), run `aspire publish`, and analyze the generated Helm chart: which objects were created for the project and for Redis.

**3. Advanced level.** Create an Aspire solution with a match statistics web service and Redis, deploy it to a kind cluster with the `aspire deploy` command (Helm 4.2 or newer), check that it works via `kubectl port-forward`, extend the generated manifests with probes and resources through `PublishAsKubernetesService`, and write a report on the differences from handwritten manifests.

### Variant 23. A file-sharing service {#v23}

**1. Initial level.** Create a web service for uploading and downloading files that stores the files in the `/data` folder, and run it as a container with a named volume.

**2. Basic level.** Run a file-sharing web service as a container that stores files in the `/data` folder on a named volume, and implement a backup of the volume with a `docker run --rm` command and a temporary container that archives the volume's contents into a host folder, and restoring the volume from the archive; check that after the container and volume are deleted, the files are restored.

**3. Advanced level.** Create a program `backup-tool` with the commands `backup`, `restore`, and `list` and the options `--volume`, `--dir`, and `--help` that uses temporary Docker containers to archive a named volume (for example, of a file-sharing service) into a host folder and restore it, checks the SHA-256 checksums of the files after the restore, and prints a report.

### Variant 24. Text search {#v24}

**1. Initial level.** Create a web service that searches for a word in a set of texts built into the image and returns the number of matches and the host name.

**2. Basic level.** Create a web service that searches for a word in a set of texts built into the image (the response is the number of matches and the host name), deploy it to kind with 1, 2, and 4 replicas, and show the distribution of requests among the pods by a ClusterIP service using a temporary client pod (`kubectl run`).

**3. Advanced level.** Deploy a web service that searches for a word in texts built into the image to kind, and create a client `search-bench` with the options `--tasks`, `--seconds`, `--keepalive`, and `--help`; measure the throughput and latency for 1, 2, and 4 replicas with and without persistent connections, and explain why the service balances connections rather than requests.

### Variant 25. Smart parking {#v25}

**1. Initial level.** Create a web service for the status of parking spaces with the city name in an environment variable, and deploy it to kind in the `dev` namespace.

**2. Basic level.** Create a web service for the status of parking spaces that reads the number of spaces and the rate from its configuration, and deploy the same image to the `dev` and `prod` namespaces of kind with separate ConfigMaps (number of spaces, rate) and Secrets; show the different behavior of the service in the two environments.

**3. Advanced level.** Deploy a parking spaces web service to kind in the `dev` and `prod` namespaces with a `ResourceQuota` and a `LimitRange`, write a script or a program `parking-deploy` with the options `--env`, `--replicas`, and `--help` that deploys an environment from a template (Deployment, ConfigMap, Secret), and show pod creation being rejected when the quota is exceeded.

### Variant 26. A transport dispatcher {#v26}

**1. Initial level.** Create a worker that processes vehicle movement messages from a RabbitMQ queue with manual acknowledgment, and run it in Compose.

**2. Basic level.** Create a worker that processes vehicle movement messages from a RabbitMQ queue with manual acknowledgment and shuts down gracefully on `SIGTERM`: it stops receiving, waits for the current message, acknowledges it, and closes the channel; run it in Compose and use the `docker stop` command to check that there are no losses or duplicates.

**3. Advanced level.** Create a worker that processes vehicle movement messages from a RabbitMQ queue (manual acknowledgments, graceful shutdown on `SIGTERM`) and a program `dispatch-check` with the options `--messages`, `--stops`, and `--help` that publishes numbered messages, stops and starts the workers several times during processing (`docker stop`/`docker kill`), and prints the number of lost and reprocessed messages for graceful and abnormal termination and for a version without `SIGTERM` handling.

### Variant 27. Crypto rates (simulated) {#v27}

**1. Initial level.** Create an Aspire solution with a web service that generates simulated rates for three cryptocurrencies, and view its logs in the dashboard.

**2. Basic level.** Create an Aspire solution with a web service that generates simulated rates for three cryptocurrencies and custom metrics `rates.value` (the current rate with a currency tag) and `rates.updates` (the number of updates); view them in the dashboard on the *Metrics* page.

**3. Advanced level.** Create an Aspire solution with a web service of simulated rates for three cryptocurrencies and a notification service that receives the rates through service discovery, records threshold crossings, and has a metric of the number of notifications, plus a program `rates-report` with the options `--threshold` and `--help` that prints a table of notifications based on `aspire otel` or `dotnet-counters` data.

### Variant 28. A matrix computation cluster {#v28}

**1. Initial level.** Create a console program that multiplies a block of matrices by a block number given as an argument and prints a checksum; build an image and check it in Docker.

**2. Basic level.** Run a multiplication of 1024×1024 matrices as a Kubernetes indexed job (16 blocks), where each pod computes its block and writes it to Redis; a separate program assembles the result and verifies it by comparing it with sequential multiplication.

**3. Advanced level.** Create a program `matrix-job` with the options `--size`, `--blocks`, `--parallelism`, and `--help` that generates a Kubernetes indexed Job whose pods multiply their block of matrices and write it to Redis, waits for completion, assembles the product, verifies it with sequential multiplication, and prints a table of time and speedup for different numbers of blocks and degrees of parallelism.

### Variant 29. Online courses {#v29}

**1. Initial level.** Create a `compose.yaml` for an online course service (a web service and PostgreSQL) with a volume for the database, and check that it works.

**2. Basic level.** Deploy an online course service (a web service and PostgreSQL) to kind: a Deployment and a Service for the web service, a StatefulSet for PostgreSQL, and a ConfigMap and a Secret for the configuration; check that it works through a NodePort.

**3. Advanced level.** For an online course service (a web service and PostgreSQL), create a `compose.yaml`, handwritten Kubernetes manifests, and an Aspire model; make a table mapping the elements of `compose.yaml` to Kubernetes objects, compare the handwritten manifests with the output of `aspire publish`, and measure the deployment time of each variant with a program `deploy-timer` with the `--help` option.

### Variant 30. A platform load test {#v30}

**1. Initial level.** Create a console load-generating client that calls a given URL with N parallel tasks for a given time and prints the number of requests per second.

**2. Basic level.** Create a console load-generating client that calls a given URL with N parallel tasks for a given time and prints the number of requests per second, the average and 95th-percentile latency, the number of errors, and the distribution of responses by host name; use it to test a service deployed to kind with 1, 2, and 4 replicas.

**3. Advanced level.** Create a tool `platform-load` with the options `--url`, `--tasks`, `--ramp`, `--seconds`, `--csv`, and `--help` that gradually increases the load, writes a CSV file with the time, requests/s, latencies, and the number of pods (via `kubectl get hpa`), and prints a final scaling table.

## Procedure

1. Study the theory and worked examples.
2. Check the tools: `docker version`, `kubectl version --client`, `kind version`, and `aspire --version`; if needed, install kind (`winget install Kubernetes.kind`) and the Aspire CLI (`dotnet tool install -g Aspire.Cli`).
3. For your variant, draw up a deployment diagram: services, images, ports, environment variables, volumes, and dependencies; for Kubernetes, the objects (Deployment, Service, ConfigMap, Secret, Job, HPA) and their labels.
4. Create a .NET 10 solution in JetBrains Rider, write a `Dockerfile` and a `.dockerignore`, build and check the images locally (`docker run`), then describe the environment in `compose.yaml` or manifests and deploy it (for Kubernetes, in a kind cluster with the `localhost:5001` registry).
5. Check scaling, a container or pod failure, a version update, and the logs; for Aspire, the resources, traces, and metrics in the dashboard; summarize the measurement results in a table.
6. After the work, free the resources: `docker compose down -v`, `kind delete cluster --name pro16`, `aspire stop`, and `docker image prune`.
7. Demonstrate the work to the instructor, explain the `Dockerfile`, manifests, and code, and answer the review questions.
