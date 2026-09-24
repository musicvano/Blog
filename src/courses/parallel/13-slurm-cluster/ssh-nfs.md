---
title: "SSH and a shared filesystem"
description: "Topic 13. Clusters and the Slurm scheduler: SSH and a shared filesystem"
outline: [2, 3]
sourceHash: "569c9a045af86ccd0e419b71bf908134adbf02fe4fe69e922679acf5e6153b32"
---

# SSH and a shared filesystem

## SSH and parallel commands

An administrator constantly runs the same commands on all nodes, and MPI without Slurm launches processes over SSH, so **passwordless key-based login** is required. An Ed25519 key is created on the `head` node and copied to the other nodes (<https://documentation.ubuntu.com/server/how-to/security/openssh-server/>):

```bash
ssh-keygen -t ed25519            # key ~/.ssh/id_ed25519
for n in node01 node02 node03; do ssh-copy-id $n; done
ssh node02 hostname              # no password prompt
```

When home directories are mounted from `head` over NFS (next section), the `~/.ssh/authorized_keys` file is the same on all nodes, and it is enough to add your own public key to it once. The `~/.ssh/config` file shortens commands, for example by setting the user name and host key checking for all cluster nodes:

```
Host node0*
    User student
    StrictHostKeyChecking accept-new
```

**Parallel commands.** The **pdsh** utility (package `pdsh`) runs a command on many nodes at once and prefixes each line with the node name, and `dshbak -c` groups identical responses. The node list is written in the compact form `node[01-03]`, as in Slurm. The Ubuntu 26.04 package (pdsh 2.35) connects over SSH by default (`pdsh -V` prints `rcmd modules: ssh,exec (default: ssh)`); in other distributions, the protocol is set with the `PDSH_RCMD_TYPE=ssh` variable. The similar **ClusterShell** utility (command `clush`, package `clustershell`) can also copy files to nodes: `clush -w node[01-03] --copy /etc/hosts`.

```bash
pdsh -w node[01-03] hostname
pdsh -w node[01-03] 'nproc; free -g | head -2' | dshbak -c
clush -w node[01-03] -b uname -r
```

Output on the test cluster (Fig. 13.2): the first call prints the lines `node01: node01`, `node02: node02`, `node03: node03` in arbitrary order, and `dshbak -c` merges the identical responses of the three nodes into one block with the header `node[01-03]`.

::: info Screenshot
Terminal on head: `pdsh -w node[01-03] hostname` and `pdsh -w node[01-03] 'nproc; free -g | head -2' | dshbak -c`; answers from every node
:::

Figure 13.2. Passwordless access to all nodes {.caption}

### Example: checking the nodes

Before starting work, the script checks that all nodes are reachable, have the expected number of processors and amount of memory, that their clocks agree, and that the MUNGE service works. The node list is passed as an argument.

```bash
#!/bin/bash
# Check cluster nodes: name, processors, memory, time, munge.
# Usage: ./check-nodes.sh [node list], default node[01-03].
NODES=${1:-node[01-03]}
export PDSH_RCMD_TYPE=ssh

echo "Nodes: $NODES; time on $(hostname): $(date +%T.%N | cut -c1-12)"
echo "node      CPU   memory, GB  time          munge"
# The quoted command runs on each node; pdsh prefixes each line
# with the node name, and errors go to stderr.
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

The command for the nodes is written in single quotes, so the `$mem` and `$m` variables are evaluated on the node itself; `munge -n | unmunge` creates and immediately verifies a credential. Output on the test cluster made of containers (they see the memory of the whole PC, hence 31.2 GB) and a run with a nonexistent node `node04` (the long SSH message line is wrapped):

```
$ ./check-nodes.sh
Nodes: node[01-03]; time on head: 19:58:07.831
node      CPU   memory, GB  time          munge
node01      4         31.2  19:58:08.055  ok
node02      4         31.2  19:58:08.055  ok
node03      4         31.2  19:58:08.030  ok
$ ./check-nodes.sh "node[01-04]"
Nodes: node[01-04]; time on head: 19:58:08.063
node      CPU   memory, GB  time          munge
node04: ssh: Could not resolve hostname node04: Name or service not
known
pdsh@head: node04: ssh exited with exit code 255
node01      4         31.2  19:58:08.314  ok
node02      4         31.2  19:58:08.323  ok
node03      4         31.2  19:58:08.257  ok
```

The time difference between nodes is tens of milliseconds, because pdsh runs commands in parallel but not simultaneously. SSH errors for `node04` go to the error stream and therefore do not end up in the table.

## The NFS shared filesystem

**NFS** (*Network File System*) is a network filesystem in which a server **exports** a directory and clients **mount** it into their directory tree. In the lab cluster, the `head` node exports `/home`, so a program built on `head` and job result files are immediately visible on all nodes (<https://documentation.ubuntu.com/server/how-to/networking/install-nfs/>). The server:

```bash
sudo apt install nfs-kernel-server
# /etc/exports: directory, allowed clients, options
/home      192.168.50.0/24(rw,sync,no_subtree_check)
/opt/apps  192.168.50.0/24(ro,sync,no_subtree_check)
# apply the changes and show the exports
sudo exportfs -ra
sudo exportfs -v
```

The `rw` option allows writing, `sync` confirms a write only after it is saved to disk, and `root_squash` applies by default: the client’s `root` user becomes `nobody` on the server. The `/opt/apps` directory is intended for shared programs installed by the administrator.

On the compute nodes, the `nfs-common` package is installed, and lines are added to `/etc/fstab` (the `_netdev` option delays mounting until the network is up):

```
head:/home      /home      nfs  defaults,_netdev  0  0
head:/opt/apps  /opt/apps  nfs  ro,_netdev        0  0
```

The commands `sudo mkdir -p /opt/apps`, `sudo mount -a`, and `df -h /home` check the mount (Fig. 13.3). Instead of `/etc/fstab`, you can use the **autofs** service, which mounts a directory on first access and unmounts it after a period of inactivity. NFS is sufficient for a few nodes; when dozens of nodes write large files at the same time, the NFS server becomes a bottleneck, and parallel filesystems are used.

::: info Screenshot
Terminal on head: `ssh node02 'df -h /home; mount | grep nfs'`; the export head:/home mounted on /home (nfs4)
:::

Figure 13.3. The shared filesystem on a compute node {.caption}

### Node software

All nodes must have the same versions of compilers and libraries; otherwise a program built on `head` will not run on a compute node. The Ubuntu 26.04 packages for the course: GCC 15.2 (`build-essential`), CMake 4.2 and Ninja (Topic 9), Open MPI 5.0.10 with PMIx 5.0.9 (`openmpi-bin`, `libopenmpi-dev`), and the .NET 10 SDK (`dotnet-sdk-10.0`). They are installed with a single command on all nodes:

```bash
clush -w head,node[01-03] -b 'sudo apt-get install -y \
    build-essential cmake ninja-build openmpi-bin libopenmpi-dev \
    dotnet-sdk-10.0'
```

`sudo` through `clush` works without a password only if the administrator has allowed it in `/etc/sudoers.d/`; otherwise the packages are installed on each node separately.

**Environment modules.** Large clusters have several versions of compilers and libraries side by side, and users select the ones they need with the **Lmod** system (package `lmod`, <https://lmod.readthedocs.io/>): `module avail` shows the available modules, `module load openmpi/5.0` changes `PATH` and `LD_LIBRARY_PATH`, and `module list` shows the loaded modules. Module files are stored on the shared filesystem (`/opt/apps/modulefiles`). In a lab cluster with one version of each package, Lmod is optional.
