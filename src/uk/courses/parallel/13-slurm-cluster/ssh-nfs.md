---
title: "SSH і спільна файлова система"
description: "Тема 13. Кластер і планувальник Slurm: SSH і спільна файлова система"
outline: [2, 3]
---

# SSH і спільна файлова система

## SSH і паралельні команди

Адміністратор постійно виконує однакові команди на всіх вузлах, а MPI без Slurm запускає процеси через SSH, тому потрібен **вхід без пароля за ключем**. Ключ Ed25519 створюють на вузлі `head` і копіюють на інші вузли (<https://documentation.ubuntu.com/server/how-to/security/openssh-server/>):

```bash
ssh-keygen -t ed25519            # ключ ~/.ssh/id_ed25519
for n in node01 node02 node03; do ssh-copy-id $n; done
ssh node02 hostname              # без запиту пароля
```

Коли домашні каталоги змонтовано з `head` через NFS (наступний розділ), файл `~/.ssh/authorized_keys` однаковий на всіх вузлах, і досить додати в нього власний відкритий ключ один раз. Файл `~/.ssh/config` скорочує команди, наприклад задає ім’я користувача й перевірку ключів вузлів для всіх вузлів кластера:

```
Host node0*
    User student
    StrictHostKeyChecking accept-new
```

**Паралельні команди.** Утиліта **pdsh** (пакет `pdsh`) виконує команду на багатьох вузлах одночасно й додає ім’я вузла на початок кожного рядка, а `dshbak -c` групує однакові відповіді. Список вузлів записують у стислій формі `node[01-03]`, як у Slurm. Пакет Ubuntu 26.04 (pdsh 2.35) підключається через SSH за замовчуванням (`pdsh -V` виводить `rcmd modules: ssh,exec (default: ssh)`); в інших дистрибутивах протокол задає змінна `PDSH_RCMD_TYPE=ssh`. Аналогічна утиліта **ClusterShell** (команда `clush`, пакет `clustershell`) також копіює файли на вузли: `clush -w node[01-03] --copy /etc/hosts`.

```bash
pdsh -w node[01-03] hostname
pdsh -w node[01-03] 'nproc; free -g | head -2' | dshbak -c
clush -w node[01-03] -b uname -r
```

Результат на тестовому кластері (рис. 13.2): перший виклик виводить рядки `node01: node01`, `node02: node02`, `node03: node03` у довільному порядку, а `dshbak -c` об’єднує однакові відповіді трьох вузлів в один блок із заголовком `node[01-03]`.

::: info Знімок екрана
Terminal on head: `pdsh -w node[01-03] hostname` and `pdsh -w node[01-03] 'nproc; free -g | head -2' | dshbak -c`; answers from every node
:::

Рис. 13.2. Безпарольний доступ до всіх вузлів {.caption}

### Приклад «Перевірка вузлів»

Скрипт перед початком роботи перевіряє, що всі вузли доступні, мають очікувану кількість процесорів і пам’яті, їхні годинники збігаються, а служба MUNGE працює. Список вузлів передається аргументом.

```bash
#!/bin/bash
# Перевірка вузлів кластера: ім'я, процесори, пам'ять, час, munge.
# Запуск: ./check-nodes.sh [список вузлів], типово node[01-03].
NODES=${1:-node[01-03]}
export PDSH_RCMD_TYPE=ssh

echo "Вузли: $NODES; час на $(hostname): $(date +%T.%N | cut -c1-12)"
echo "вузол     CPU  пам'ять, ГБ  час           munge"
# Команда в лапках виконується на кожному вузлі; pdsh додає
# на початок рядка ім'я вузла, помилки йдуть у stderr.
pdsh -w "$NODES" '
    mem=$(awk "/MemTotal/ {printf \"%.1f\", \$2/1048576}" \
              /proc/meminfo)
    if munge -n | unmunge >/dev/null 2>&1; then m=ok; else m=FAIL; fi
    echo "$(nproc) $mem $(date +%T.%N | cut -c1-12) $m"' |
  sort |
  while read -r node cpus mem now m; do
      printf "%-8s %4s %12s  %-13s %s\n" "${node%:}" "$cpus" "$mem" \
             "$now" "$m"
  done
```

Команду для вузлів записано в одинарних лапках, тому змінні `$mem` і `$m` обчислюються вже на вузлі; `munge -n | unmunge` створює й одразу перевіряє облікові дані. Результат на тестовому кластері з контейнерів (вони бачать пам’ять усього ПК, тому 31,2 ГБ) і запуск із неіснуючим вузлом `node04` (довгий рядок повідомлення SSH перенесено):

```
$ ./check-nodes.sh
Вузли: node[01-03]; час на head: 19:58:07.831
вузол     CPU  пам'ять, ГБ  час           munge
node01      4         31.2  19:58:08.055  ok
node02      4         31.2  19:58:08.055  ok
node03      4         31.2  19:58:08.030  ok
$ ./check-nodes.sh "node[01-04]"
Вузли: node[01-04]; час на head: 19:58:08.063
вузол     CPU  пам'ять, ГБ  час           munge
node04: ssh: Could not resolve hostname node04: Name or service not
known
pdsh@head: node04: ssh exited with exit code 255
node01      4         31.2  19:58:08.314  ok
node02      4         31.2  19:58:08.323  ok
node03      4         31.2  19:58:08.257  ok
```

Різниця часу між вузлами – десятки мілісекунд, бо pdsh запускає команди паралельно, але не одночасно. Помилки SSH для `node04` йдуть у потік помилок і тому не потрапляють у таблицю.

## Спільна файлова система NFS

**NFS** (*Network File System*) – мережна файлова система, у якій сервер **експортує** каталог, а клієнти **монтують** його у своє дерево каталогів. У навчальному кластері вузол `head` експортує `/home`, тому програма, зібрана на `head`, і файли результатів завдань одразу видно на всіх вузлах (<https://documentation.ubuntu.com/server/how-to/networking/install-nfs/>). Сервер:

```bash
sudo apt install nfs-kernel-server
# /etc/exports: каталог, дозволені клієнти, параметри
/home      192.168.50.0/24(rw,sync,no_subtree_check)
/opt/apps  192.168.50.0/24(ro,sync,no_subtree_check)
# застосувати зміни й показати експорт
sudo exportfs -ra
sudo exportfs -v
```

Параметр `rw` дозволяє запис, `sync` підтверджує запис лише після збереження на диск, а за замовчуванням діє `root_squash`: користувач `root` клієнта на сервері стає `nobody`. Каталог `/opt/apps` призначено для спільних програм, які встановлює адміністратор.

На обчислювальних вузлах установлюють пакет `nfs-common` і додають рядки в `/etc/fstab` (параметр `_netdev` відкладає монтування до запуску мережі):

```
head:/home      /home      nfs  defaults,_netdev  0  0
head:/opt/apps  /opt/apps  nfs  ro,_netdev        0  0
```

Команди `sudo mkdir -p /opt/apps`, `sudo mount -a` і `df -h /home` перевіряють монтування (рис. 13.3). Замість `/etc/fstab` можна використати службу **autofs**, яка монтує каталог під час першого звернення й відмонтовує після простою. NFS достатньо для кількох вузлів; коли десятки вузлів одночасно записують великі файли, сервер NFS стає вузьким місцем, і використовують паралельні файлові системи.

::: info Знімок екрана
Terminal on head: `ssh node02 'df -h /home; mount | grep nfs'`; the export head:/home mounted on /home (nfs4)
:::

Рис. 13.3. Спільна файлова система на обчислювальному вузлі {.caption}

### Програмне забезпечення вузлів

На всіх вузлах мають бути однакові версії компіляторів і бібліотек, інакше програма, зібрана на `head`, не запуститься на обчислювальному вузлі. Пакети Ubuntu 26.04 для курсу: GCC 15.2 (`build-essential`), CMake 4.2 і Ninja (тема 9), Open MPI 5.0.10 з PMIx 5.0.9 (`openmpi-bin`, `libopenmpi-dev`), .NET SDK 10 (`dotnet-sdk-10.0`). Їх установлюють однією командою на всіх вузлах:

```bash
clush -w head,node[01-03] -b 'sudo apt-get install -y \
    build-essential cmake ninja-build openmpi-bin libopenmpi-dev \
    dotnet-sdk-10.0'
```

Команда `sudo` через `clush` працює без пароля лише тоді, коли адміністратор дозволив це в `/etc/sudoers.d/`; інакше пакети встановлюють на кожному вузлі окремо.

**Модулі середовища.** На великих кластерах співіснують кілька версій компіляторів і бібліотек, і користувач вибирає потрібні командами системи **Lmod** (пакет `lmod`, <https://lmod.readthedocs.io/>): `module avail` показує доступні модулі, `module load openmpi/5.0` змінює `PATH` і `LD_LIBRARY_PATH`, `module list` – завантажені модулі. Файли модулів зберігають на спільній файловій системі (`/opt/apps/modulefiles`). У навчальному кластері з однією версією кожного пакета Lmod не обов’язковий.
