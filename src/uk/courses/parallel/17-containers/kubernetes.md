---
title: "Kubernetes: кластер і об’єкти"
description: "Тема 17. Docker, Kubernetes, Aspire: Kubernetes: кластер і об’єкти"
outline: [2, 3]
---

# Kubernetes: кластер і об’єкти

## Kubernetes: архітектура й локальний кластер

Compose керує контейнерами на **одному** комп’ютері. **Kubernetes** (K8s, <https://kubernetes.io/docs/concepts/overview/components/>) – оркестратор контейнерів для **кластера** комп’ютерів: розміщує контейнери на вузлах, перезапускає їх після збоїв, масштабує, оновлює без простою й балансує навантаження. Користувач описує **бажаний стан** (*desired state*) у маніфестах YAML, а контролери Kubernetes безперервно приводять фактичний стан до бажаного (рис. 17.7).

```mermaid
flowchart TB
  K["<code>kubectl</code>"] -->|"HTTPS,<br>YAML-маніфести"| API
  subgraph CP["<b>Площина керування</b>"]
    API["kube-apiserver"]
    ETCD["etcd"] <--> API
    SCH["scheduler"] <--> API
    API <--> CM["controller-manager"]
    CPN["<code>pro16-control-plane</code>"]
  end
  subgraph W1["Робочий вузол 1"]
    KL1["kubelet"] ~~~ KP1["kube-proxy"] ~~~ CD1
    CD1["containerd"] --> P11["Pod"] & P12["Pod"]
  end
  subgraph W2["Робочий вузол 2"]
    KL2["kubelet"] ~~~ KP2["kube-proxy"] ~~~ CD2
    CD2["containerd"] --> P21["Pod"] & P22["Pod"]
  end
  API <--> KL1
  API <--> KL2
  CM ~~~ CPN
  K ~~~ ETCD & SCH
  CPN ~~~ KL1
  P11 ~~~ KL2
  P21 ~~~ N["kubelet кожного вузла отримує від API-сервера<br>поди й запускає їх; бажаний стан кластера<br>зберігається в etcd"]
```

Рис. 17.7. Архітектура кластера Kubernetes {.caption}

**Площина керування** (*control plane*):

- `kube-apiserver` – REST API кластера; усі компоненти й `kubectl` працюють лише через нього;
- `etcd` – розподілене сховище ключ–значення з консенсусом Raft (тема 16), де зберігається стан кластера;
- `kube-scheduler` – вибирає вузол для кожного нового пода з урахуванням запитаних ресурсів;
- `kube-controller-manager` – контролери (Deployment, ReplicaSet, Job, вузлів тощо), що порівнюють бажаний і фактичний стан.

**Робочі вузли** (*nodes*):

- `kubelet` – агент вузла: отримує від API-сервера описи подів, запускає їхні контейнери через середовище виконання (containerd) і виконує проби;
- `kube-proxy` – налаштовує правила мережі, за якими звернення до служби (Service) потрапляють до подів.

### Локальні кластери

Для навчання й розробки кластер запускають на одному ПК:

- **Docker Desktop** має вбудований Kubernetes (<https://docs.docker.com/desktop/use-desktop/kubernetes/>): у поданні *Kubernetes* кнопка *Create cluster* створює кластер типу *Kubeadm* (один вузол) або *kind* (кілька вузлів, вибір версії);
- **kind** (*Kubernetes in Docker*, <https://kind.sigs.k8s.io/>) – окрема утиліта, у якій кожен вузол кластера – контейнер Docker; кластер описують файлом і створюють однією командою;
- **k3s** (<https://k3s.io/>) – полегшений дистрибутив Kubernetes для справжніх серверів і ВМ, наприклад вузлів кластера з теми 13.

У курсі використовується **kind 0.33** з окремим реєстром образів `registry:2`: конфігурацію кластера зберігають у файлі, а образи надсилають у реєстр так само, як у промисловий. Встановлення: `winget install Kubernetes.kind` (після встановлення відкрити новий термінал); `kubectl` встановлюється разом із Docker Desktop. Файл `kind.yaml`:

```yaml
# Кластер kind: вузол площини керування і 2 робочі вузли.
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

Вузли kind – контейнери, і для них `localhost` означає сам вузол, а не ПК. Тому реєстр підключають до мережі `kind`, а на кожному вузлі файл `hosts.toml` для containerd перенаправляє ім’я `localhost:5001` на контейнер реєстру (<https://kind.sigs.k8s.io/docs/user/local-registry/>, рис. 17.8). Сценарій `kind-setup.ps1` для PowerShell:

```powershell
# Локальний реєстр образів і кластер kind, що бере образи з нього.
docker run -d --restart=always -p 127.0.0.1:5001:5000 `
    --name pro16-registry registry:2
kind create cluster --config kind.yaml
# Вузли kind – контейнери: для них localhost:5001 – це реєстр.
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
  WIN["Windows:<br><code>docker</code>, <code>kubectl</code>, браузер"]
  subgraph DD["Docker Desktop (ВМ WSL 2)"]
    REG["<code>pro16-registry</code><br><code>registry:2</code>, порт 5000"]
    subgraph KN["мережа <code>kind</code>"]
      CPN["<code>pro16-control-plane</code><br>порти 30080, 30081"]
      WK1["<code>pro16-worker</code><br>containerd, поди"]
      WK2["<code>pro16-worker2</code><br>containerd, поди"]
      CPN ~~~ WK1 ~~~ WK2
    end
  end
  WIN -->|"<code>docker push</code><br><code>localhost:5001/…</code>"| REG
  WIN -->|"<code>kubectl</code> (API),<br><code>localhost:30080</code><br>(<code>NodePort</code>)"| CPN
  WK1 -.->|"pull"| REG
  WK2 -.-> REG
  REG ~~~ N["кожен вузол kind – контейнер Docker;<br>файл <code>hosts.toml</code> на вузлах перенаправляє<br><code>localhost:5001</code> на <code>http://pro16-registry:5000</code>,<br>тож образ має однакове ім’я<br>для <code>docker push</code> і для подів"]
```

Рис. 17.8. Кластер kind і локальний реєстр образів {.caption}

Сценарій виконався за 27 с (образ вузла `kindest/node:v1.37.0` уже завантажено; перше завантаження займає ще хвилину). Через кілька секунд усі вузли готові:

```
NAME                  STATUS   ROLES           AGE   VERSION
pro16-control-plane   Ready    control-plane   28s   v1.37.0
pro16-worker          Ready    <none>          18s   v1.37.0
pro16-worker2         Ready    <none>          18s   v1.37.0
```

`kind create cluster` сам додає контекст `kind-pro16` у `~/.kube/config` і робить його поточним (`kubectl config current-context`). Вузли видно в Docker Desktop як три контейнери (рис. 17.9); кластер видаляє команда `kind delete cluster --name pro16`.

Образи тегують іменем реєстру й надсилають:

```powershell
docker tag pro16/api:1.0 localhost:5001/primes-api:1.0
docker push localhost:5001/primes-api:1.0
docker tag pro16/worker:1.0 localhost:5001/primes-worker:1.0
docker push localhost:5001/primes-worker:1.0
```

::: info Знімок екрана
Docker Desktop → Containers: pro16-control-plane, pro16-worker, pro16-worker2 (image kindest/node:v1.37.0) and pro16-registry (registry:2, port 127.0.0.1:5001) running; optionally the Kubernetes view showing context kind-pro16
:::

Рис. 17.9. Вузли kind і реєстр у Docker Desktop {.caption}

## Об’єкти Kubernetes і kubectl

Основні об’єкти (рис. 17.10):

- **Pod** – найменша одиниця розгортання: один або кілька контейнерів зі спільною IP-адресою й томами; поди смертні: після збою вузла под не «переїжджає», а створюється новий;
- **ReplicaSet** – підтримує задану кількість однакових подів;
- **Deployment** – керує ReplicaSet-ами й виконує поступові оновлення та відкати (<https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>);
- **Service** – стабільне ім’я DNS і віртуальна IP-адреса для групи подів, обраних за **мітками** (*labels*) (<https://kubernetes.io/docs/concepts/services-networking/service/>): тип `ClusterIP` (лише всередині кластера), `NodePort` (порт 30000–32767 на кожному вузлі), `LoadBalancer` (зовнішній балансувальник хмари);
- **ConfigMap** і **Secret** – конфігурація та секрети, які передаються контейнерам як змінні середовища або файли (<https://kubernetes.io/docs/concepts/configuration/configmap/>, <https://kubernetes.io/docs/concepts/configuration/secret/>);
- **Namespace** – простір імен для групування об’єктів (середовища, команди, лабораторні).

```mermaid
flowchart TB
  D["Deployment <code>worker</code>,<br><code>replicas: 3</code>"] -->|"створює й оновлює"| RS["ReplicaSet<br><code>worker-7787d686df</code>"]
  RS --> P1["Pod 1<br><code>app=worker</code><br><code>10.244.1.5</code>"] & P2["Pod 2<br><code>app=worker</code><br><code>10.244.1.6</code>"] & P3["Pod 3<br><code>app=worker</code><br><code>10.244.1.7</code>"]
  C["под-клієнт"] --> S["Service <code>worker</code><br>(<code>ClusterIP</code>)<br><code>selector: app=worker</code>"]
  S -.-> P1 & P2 & P3
  P2 ~~~ SN["віртуальна IP-адреса й DNS-ім’я<br><code>worker.pro16.svc</code><br><code>.cluster.local</code>"]
  SN ~~~ N1["підтримує рівно 3 поди:<br>замість видаленого створює новий"]
  N1 ~~~ N2["Service обирає поди за мітками<br>й розподіляє між ними з’єднання;<br>поди, що не пройшли <code>readinessProbe</code>,<br>з переліку виключаються"]
```

Рис. 17.10. Deployment, ReplicaSet, Service і Pod {.caption}

Маніфести застосунку `Primes` лежать у теці `k8s/` і застосовуються в алфавітному порядку. Простір імен, конфігурація й секрет (`00-namespace.yaml`, `10-config.yaml`):

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
stringData:                  # Kubernetes збереже значення в base64
  RABBITMQ_DEFAULT_USER: primes
  RABBITMQ_DEFAULT_PASS: change-me
  ConnectionStrings__rabbitmq: amqp://primes:change-me@rabbitmq:5672
```

Значення секрету зберігаються в кодуванні base64, а не шифруються: команда `kubectl -n pro16 get secret primes-secret -o jsonpath="{.data.RABBITMQ_DEFAULT_PASS}"` повертає `Y2hhbmdlLW1l`, тобто `change-me`. Секрети захищають правами доступу RBAC і шифруванням `etcd`, а файли з паролями не додають у git.

RabbitMQ і Redis для навчання розгорнуто як Deployment з однією реплікою (`20-infra.yaml`; для справжніх даних використовують StatefulSet з томами PersistentVolumeClaim):

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
          readinessProbe:      # порт AMQP приймає з’єднання
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

Redis описано так само: Deployment з образом `redis:8.8`, портом 6379 і Service `redis`. Усередині простору імен `pro16` под звертається до служби за коротким ім’ям `rabbitmq`, з інших просторів – `rabbitmq.pro16.svc.cluster.local`.

API (`30-api.yaml`) – три репліки, проби, ресурси й служба `NodePort`:

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
          readinessProbe:      # готовий приймати запити?
            httpGet: { path: /health/ready, port: 8080 }
            periodSeconds: 5
          livenessProbe:       # процес не завис?
            httpGet: { path: /health/live, port: 8080 }
            periodSeconds: 10
            failureThreshold: 3
          lifecycle:           # дати Service прибрати под
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
    - port: 80               # порт служби в кластері
      targetPort: 8080       # порт контейнера
      nodePort: 30080        # порт на кожному вузлі
```

Робітник (`40-worker.yaml`) – Deployment з двома репліками, образом `localhost:5001/primes-worker:1.0`, `envFrom` з `primes-config` і `primes-secret`, ресурсами `requests: { cpu: 500m, memory: 64Mi }`, `limits: { cpu: "1", memory: 256Mi }` і `terminationGracePeriodSeconds: 30` (скільки чекати між `SIGTERM` і `SIGKILL`); служба йому не потрібна, бо до робітника ніхто не звертається.

### Команди kubectl

Утиліта `kubectl` (<https://kubernetes.io/docs/reference/kubectl/>) надсилає маніфести API-серверу й показує стан кластера:

```powershell
kubectl apply -f k8s/                  # створити або оновити все
kubectl -n pro16 get deploy,pods,svc -o wide
kubectl -n pro16 describe pod api-54b79f6bdf-2kml2   # події пода
kubectl -n pro16 logs -l app=worker --prefix --tail 2
kubectl -n pro16 port-forward svc/api 18080:80  # тунель до служби
kubectl -n pro16 exec -it deploy/api -- sh     # оболонка в поді
kubectl delete -f k8s/                 # видалити все
```

Застосування маніфестів і стан через 28 с (рис. 17.12):

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

Ім’я пода складається з імені Deployment, хешу шаблону ReplicaSet (`7787d686df`) і випадкового суфікса; планувальник розподілив поди між двома робочими вузлами. Поки RabbitMQ стартував, поди API мали стан `0/1 Running`: процес працював, але `readinessProbe` повертала 503, і служба не надсилала їм запитів. Кожен запит `curl.exe http://localhost:30080/` відповідав іменем іншого пода (`api-…-2kml2`, `api-…-4pgcv`, `api-…-jgqd2`): служба розподіляє нові з’єднання між готовими подами. Завдання на $2 \cdot 10^{7}$ з двома робітниками виконалося за 2,7 с, а `kubectl logs -l app=worker --prefix` показав рядки обох подів.
