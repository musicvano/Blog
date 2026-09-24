---
title: "Kubernetes: clusters and objects"
description: "Topic 17. Docker, Kubernetes, Aspire: Kubernetes: clusters and objects"
outline: [2, 3]
sourceHash: "b74a9c1f4cf3f41bb98f575010a57a64ba084dd416d8d4ed5bf1b6b38d8a9ddb"
---

# Kubernetes: clusters and objects

## Kubernetes: architecture and a local cluster

Compose manages containers on **one** computer. **Kubernetes** (K8s, <https://kubernetes.io/docs/concepts/overview/components/>) is a container orchestrator for a **cluster** of computers: it places containers on nodes, restarts them after failures, scales them, updates them without downtime, and balances the load. The user describes the **desired state** in YAML manifests, and Kubernetes controllers continuously bring the actual state to the desired one (Fig. 17.7).

```mermaid
flowchart TB
  K["<code>kubectl</code>"] -->|"HTTPS,<br>YAML manifests"| API
  subgraph CP["<b>Control plane</b>"]
    API["kube-apiserver"]
    ETCD["etcd"] <--> API
    SCH["scheduler"] <--> API
    API <--> CM["controller-manager"]
    CPN["<code>pro16-control-plane</code>"]
  end
  subgraph W1["Worker node 1"]
    KL1["kubelet"] ~~~ KP1["kube-proxy"] ~~~ CD1
    CD1["containerd"] --> P11["Pod"] & P12["Pod"]
  end
  subgraph W2["Worker node 2"]
    KL2["kubelet"] ~~~ KP2["kube-proxy"] ~~~ CD2
    CD2["containerd"] --> P21["Pod"] & P22["Pod"]
  end
  API <--> KL1
  API <--> KL2
  CM ~~~ CPN
  K ~~~ ETCD & SCH
  CPN ~~~ KL1
  P11 ~~~ KL2
  P21 ~~~ N["the kubelet of each node receives pods<br>from the API server and runs them; the desired<br>state of the cluster is stored in etcd"]
```

Figure 17.7. Kubernetes cluster architecture {.caption}

The **control plane**:

- `kube-apiserver` is the cluster's REST API; all components and `kubectl` work only through it;
- `etcd` is a distributed key–value store with Raft consensus (Topic 16), where the cluster state is stored;
- `kube-scheduler` chooses a node for each new pod, taking the requested resources into account;
- `kube-controller-manager` runs the controllers (Deployment, ReplicaSet, Job, node, and others) that compare the desired and actual state.

**Worker nodes**:

- `kubelet` is the node agent: it receives pod descriptions from the API server, starts their containers through the container runtime (containerd), and runs the probes;
- `kube-proxy` sets up the network rules by which requests to a Service reach the pods.

### Local clusters

For learning and development, a cluster is run on a single PC:

- **Docker Desktop** has built-in Kubernetes (<https://docs.docker.com/desktop/use-desktop/kubernetes/>): in the *Kubernetes* view, the *Create cluster* button creates a cluster of the *Kubeadm* type (one node) or the *kind* type (several nodes, version selection);
- **kind** (*Kubernetes in Docker*, <https://kind.sigs.k8s.io/>) is a separate utility in which each cluster node is a Docker container; the cluster is described in a file and created with a single command;
- **k3s** (<https://k3s.io/>) is a lightweight Kubernetes distribution for real servers and VMs, such as the cluster nodes from Topic 13.

The course uses **kind 0.33** with a separate `registry:2` image registry: the cluster configuration is kept in a file, and images are pushed to the registry just as they would be in production. Installation: `winget install Kubernetes.kind` (open a new terminal after installing); `kubectl` is installed together with Docker Desktop. The `kind.yaml` file:

```yaml
# A kind cluster: a control-plane node and 2 worker nodes.
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: pro16
nodes:
  - role: control-plane
    extraPortMappings:           # NodePort -> localhost
      - { containerPort: 30080, hostPort: 30080 }
      - { containerPort: 30081, hostPort: 30081 }
  - role: worker
  - role: worker
```

kind nodes are containers, and for them `localhost` means the node itself, not the PC. Therefore, the registry is connected to the `kind` network, and on each node a `hosts.toml` file for containerd redirects the name `localhost:5001` to the registry container (<https://kind.sigs.k8s.io/docs/user/local-registry/>, Fig. 17.8). The PowerShell script `kind-setup.ps1`:

```powershell
# A local image registry and a kind cluster that pulls images from it.
docker run -d --restart=always -p 127.0.0.1:5001:5000 `
    --name pro16-registry registry:2
kind create cluster --config kind.yaml
# kind nodes are containers: for them, localhost:5001 is the registry.
$dir = "/etc/containerd/certs.d/localhost:5001"
foreach ($node in kind get nodes --name pro16) {
    docker exec $node mkdir -p $dir
    '[host."http://pro16-registry:5000"]' |
        docker exec -i $node cp /dev/stdin "$dir/hosts.toml"
}
docker network connect kind pro16-registry
kubectl get nodes
```

```mermaid
flowchart TB
  WIN["Windows:<br><code>docker</code>, <code>kubectl</code>, browser"]
  subgraph DD["Docker Desktop (WSL 2 VM)"]
    REG["<code>pro16-registry</code><br><code>registry:2</code>, port 5000"]
    subgraph KN["network <code>kind</code>"]
      CPN["<code>pro16-control-plane</code><br>ports 30080, 30081"]
      WK1["<code>pro16-worker</code><br>containerd, pods"]
      WK2["<code>pro16-worker2</code><br>containerd, pods"]
      CPN ~~~ WK1 ~~~ WK2
    end
  end
  WIN -->|"<code>docker push</code><br><code>localhost:5001/…</code>"| REG
  WIN -->|"<code>kubectl</code> (API),<br><code>localhost:30080</code><br>(<code>NodePort</code>)"| CPN
  WK1 -.->|"pull"| REG
  WK2 -.-> REG
  REG ~~~ N["each kind node is a Docker container;<br>the <code>hosts.toml</code> file on the nodes redirects<br><code>localhost:5001</code> to <code>http://pro16-registry:5000</code>,<br>so an image has the same name<br>for <code>docker push</code> and for pods"]
```

Figure 17.8. A kind cluster and a local image registry {.caption}

The script ran in 27 s (with the node image `kindest/node:v1.37.0` already downloaded; the first download takes another minute). A few seconds later, all nodes are ready:

```
NAME                  STATUS   ROLES           AGE   VERSION
pro16-control-plane   Ready    control-plane   28s   v1.37.0
pro16-worker          Ready    <none>          18s   v1.37.0
pro16-worker2         Ready    <none>          18s   v1.37.0
```

`kind create cluster` itself adds the `kind-pro16` context to `~/.kube/config` and makes it current (`kubectl config current-context`). The nodes are visible in Docker Desktop as three containers (Fig. 17.9); the cluster is deleted with the command `kind delete cluster --name pro16`.

Images are tagged with the registry name and pushed:

```powershell
docker tag pro16/api:1.0 localhost:5001/primes-api:1.0
docker push localhost:5001/primes-api:1.0
docker tag pro16/worker:1.0 localhost:5001/primes-worker:1.0
docker push localhost:5001/primes-worker:1.0
```

::: info Screenshot
Docker Desktop → Containers: pro16-control-plane, pro16-worker, pro16-worker2 (image kindest/node:v1.37.0) and pro16-registry (registry:2, port 127.0.0.1:5001) running; optionally the Kubernetes view showing context kind-pro16
:::

Figure 17.9. kind nodes and the registry in Docker Desktop {.caption}

## Kubernetes objects and kubectl

The main objects (Fig. 17.10):

- a **Pod** is the smallest unit of deployment: one or more containers with a shared IP address and volumes; pods are mortal: after a node failure, a pod does not “move”; a new one is created instead;
- a **ReplicaSet** maintains a given number of identical pods;
- a **Deployment** manages ReplicaSets and performs rolling updates and rollbacks (<https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>);
- a **Service** is a stable DNS name and virtual IP address for a group of pods selected by **labels** (<https://kubernetes.io/docs/concepts/services-networking/service/>): the `ClusterIP` type (only inside the cluster), `NodePort` (a port 30000–32767 on every node), and `LoadBalancer` (an external cloud load balancer);
- **ConfigMap** and **Secret** hold configuration and secrets, which are passed to containers as environment variables or files (<https://kubernetes.io/docs/concepts/configuration/configmap/>, <https://kubernetes.io/docs/concepts/configuration/secret/>);
- a **Namespace** groups objects (environments, teams, labs).

```mermaid
flowchart TB
  D["Deployment <code>worker</code>,<br><code>replicas: 3</code>"] -->|"creates and updates"| RS["ReplicaSet<br><code>worker-7787d686df</code>"]
  RS --> P1["Pod 1<br><code>app=worker</code><br><code>10.244.1.5</code>"] & P2["Pod 2<br><code>app=worker</code><br><code>10.244.1.6</code>"] & P3["Pod 3<br><code>app=worker</code><br><code>10.244.1.7</code>"]
  C["client pod"] --> S["Service <code>worker</code><br>(<code>ClusterIP</code>)<br><code>selector: app=worker</code>"]
  S -.-> P1 & P2 & P3
  P2 ~~~ SN["virtual IP address and DNS name<br><code>worker.pro16.svc</code><br><code>.cluster.local</code>"]
  SN ~~~ N1["maintains exactly 3 pods:<br>creates a new one to replace a deleted one"]
  N1 ~~~ N2["a Service selects pods by labels<br>and distributes connections among them;<br>pods that fail the <code>readinessProbe</code><br>are excluded from the list"]
```

Figure 17.10. Deployment, ReplicaSet, Service, and Pod {.caption}

The manifests of the `Primes` application are in the `k8s/` folder and are applied in alphabetical order. The namespace, configuration, and secret (`00-namespace.yaml`, `10-config.yaml`):

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: pro16
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: primes-config
  namespace: pro16
data:
  ConnectionStrings__redis: redis:6379
---
apiVersion: v1
kind: Secret
metadata:
  name: primes-secret
  namespace: pro16
type: Opaque
stringData:                  # Kubernetes stores the values in base64
  RABBITMQ_DEFAULT_USER: primes
  RABBITMQ_DEFAULT_PASS: change-me
  ConnectionStrings__rabbitmq: amqp://primes:change-me@rabbitmq:5672
```

Secret values are stored base64-encoded, not encrypted: the command `kubectl -n pro16 get secret primes-secret -o jsonpath="{.data.RABBITMQ_DEFAULT_PASS}"` returns `Y2hhbmdlLW1l`, that is, `change-me`. Secrets are protected by RBAC access rights and `etcd` encryption, and files with passwords are not added to git.

For learning purposes, RabbitMQ and Redis are deployed as Deployments with one replica (`20-infra.yaml`; for real data, a StatefulSet with PersistentVolumeClaim volumes is used):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rabbitmq
  namespace: pro16
spec:
  replicas: 1
  selector:
    matchLabels: { app: rabbitmq }
  template:
    metadata:
      labels: { app: rabbitmq }
    spec:
      containers:
        - name: rabbitmq
          image: rabbitmq:4-management
          envFrom:
            - secretRef: { name: primes-secret }
          ports: [{ containerPort: 5672 }]
          readinessProbe:      # the AMQP port accepts connections
            tcpSocket: { port: 5672 }
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: rabbitmq
  namespace: pro16
spec:
  selector: { app: rabbitmq }
  ports: [{ port: 5672 }]
```

Redis is described in the same way: a Deployment with the `redis:8.8` image, port 6379, and a `redis` Service. Inside the `pro16` namespace, a pod reaches a service by the short name `rabbitmq`; from other namespaces, by `rabbitmq.pro16.svc.cluster.local`.

The API (`30-api.yaml`) has three replicas, probes, resources, and a `NodePort` service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: pro16
spec:
  replicas: 3
  selector:
    matchLabels: { app: api }
  strategy:
    type: RollingUpdate
    rollingUpdate: { maxUnavailable: 0, maxSurge: 1 }
  template:
    metadata:
      labels: { app: api }
    spec:
      containers:
        - name: api
          image: localhost:5001/primes-api:1.0
          ports: [{ containerPort: 8080 }]
          envFrom:
            - configMapRef: { name: primes-config }
            - secretRef: { name: primes-secret }
          resources:
            requests: { cpu: 100m, memory: 128Mi }
            limits: { cpu: "1", memory: 256Mi }
          readinessProbe:      # ready to accept requests?
            httpGet: { path: /health/ready, port: 8080 }
            periodSeconds: 5
          livenessProbe:       # is the process not hung?
            httpGet: { path: /health/live, port: 8080 }
            periodSeconds: 10
            failureThreshold: 3
          lifecycle:           # let the Service remove the pod
            preStop:
              sleep: { seconds: 5 }
---
apiVersion: v1
kind: Service
metadata:
  name: api
  namespace: pro16
spec:
  type: NodePort
  selector: { app: api }
  ports:
    - port: 80               # service port in the cluster
      targetPort: 8080       # container port
      nodePort: 30080        # port on every node
```

The worker (`40-worker.yaml`) is a Deployment with two replicas, the `localhost:5001/primes-worker:1.0` image, `envFrom` with `primes-config` and `primes-secret`, the resources `requests: { cpu: 500m, memory: 64Mi }` and `limits: { cpu: "1", memory: 256Mi }`, and `terminationGracePeriodSeconds: 30` (how long to wait between `SIGTERM` and `SIGKILL`); it does not need a service because no one connects to the worker.

### kubectl commands

The `kubectl` utility (<https://kubernetes.io/docs/reference/kubectl/>) sends manifests to the API server and shows the state of the cluster:

```powershell
kubectl apply -f k8s/                  # create or update everything
kubectl -n pro16 get deploy,pods,svc -o wide
kubectl -n pro16 describe pod api-54b79f6bdf-2kml2   # pod events
kubectl -n pro16 logs -l app=worker --prefix --tail 2
kubectl -n pro16 port-forward svc/api 18080:80  # tunnel to a service
kubectl -n pro16 exec -it deploy/api -- sh     # shell in a pod
kubectl delete -f k8s/                 # delete everything
```

Applying the manifests and the state after 28 s (Fig. 17.12):

```
NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/api        3/3     3            3           28s
deployment.apps/rabbitmq   1/1     1            1           28s
deployment.apps/redis      1/1     1            1           28s
deployment.apps/worker     2/2     2            2           28s

NAME                            READY   STATUS    NODE
pod/api-54b79f6bdf-2kml2        1/1     Running   pro16-worker
pod/api-54b79f6bdf-4pgcv        1/1     Running   pro16-worker2
pod/api-54b79f6bdf-jgqd2        1/1     Running   pro16-worker
pod/rabbitmq-75dcd6c79c-8c4b7   1/1     Running   pro16-worker
pod/redis-78c8fcb445-pr6dc      1/1     Running   pro16-worker2
pod/worker-7787d686df-pjlxw     1/1     Running   pro16-worker2
pod/worker-7787d686df-vpz5c     1/1     Running   pro16-worker

NAME               TYPE        CLUSTER-IP      PORT(S)
service/api        NodePort    10.96.136.250   80:30080/TCP
service/rabbitmq   ClusterIP   10.96.226.227   5672/TCP
service/redis      ClusterIP   10.96.152.193   6379/TCP
```

A pod's name consists of the Deployment name, the hash of the ReplicaSet template (`7787d686df`), and a random suffix; the scheduler distributed the pods between the two worker nodes. While RabbitMQ was starting, the API pods had the state `0/1 Running`: the process was running, but the `readinessProbe` returned 503, and the service did not send requests to them. Each request `curl.exe http://localhost:30080/` responded with the name of a different pod (`api-…-2kml2`, `api-…-4pgcv`, `api-…-jgqd2`): the service distributes new connections among the ready pods. A job for $2 \cdot 10^{7}$ with two workers completed in 2.7 s, and `kubectl logs -l app=worker --prefix` showed lines from both pods.
