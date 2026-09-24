---
title: "Summary"
description: "Topic 13. Clusters and the Slurm scheduler: conclusions and review questions"
sourceHash: "2a0f10798f94e330fa62e3633fbefc469a6c84e6445650297debb3f942ce1313"
---

# Summary

## Conclusions

A compute cluster consists of login, control, and compute nodes connected by a network, with a shared filesystem and the same users on all nodes. The lab cluster is built from four Hyper-V VMs running Ubuntu Server 26.04: static Netplan addresses, `/etc/hosts`, chrony time synchronization, SSH key-based login and the parallel commands `pdsh`/`clush`, and the `/home` directory over NFS. Slurm 25.11 consists of `slurmctld` on the control node, `slurmd` on the compute nodes, and the optional `slurmdbd` for accounting; messages are protected by MUNGE with a shared key. The cluster is described by a `slurm.conf` that is identical on all nodes, node resources are taken from `slurmd -C`, and cgroup confines jobs to the allocated cores and memory. A user submits `sbatch` scripts with `#SBATCH` directives, launches steps with `srun` (MPI with `--mpi=pmix`), builds job arrays and chains of dependent jobs, and checks the results with `squeue`, `scontrol`, and `sacct`. Backfill scheduling starts short jobs in gaps without delaying reservations, so a realistic `--time` pays off. Compute nodes are tuned: the `performance` governor, THP, `swappiness`, `memlock` and `nofile` limits, MTU, disabling unnecessary services — and every change is verified by measurement.

## Self-check questions

1. What roles do cluster nodes have? Why use a separate compute network?
2. Which VMs make up the lab cluster? Why can’t a cluster be built in WSL2?
3. Why must users have the same UID and GID on all nodes? How is this ensured?
4. Why is time synchronization needed in a Slurm cluster? How is it configured?
5. How do you set up SSH key-based login? What do `pdsh`, `dshbak`, and `clush` do?
6. How do you export and mount an NFS directory? What do `rw`, `sync`, and `root_squash` mean?
7. What are `slurmctld`, `slurmd`, `slurmstepd`, and `slurmdbd` for?
8. How does MUNGE work, and what requirements does it place on nodes?
9. What sections does `slurm.conf` have? How do you get the `NodeName` line for a node?
10. What are `cgroup.conf` and the `ConstrainCores` and `ConstrainRAMSpace` parameters for?
11. How do `sbatch`, `srun`, and `salloc` differ? What is a job step?
12. What states does a job go through? What do `TIMEOUT`, `OUT_OF_MEMORY`, and `NODE_FAIL` mean?
13. How do you run an MPI program through Slurm? What happens without PMIx?
14. How do you specify the layout of a hybrid MPI + OpenMP job?
15. How do job arrays and the `afterok` and `afterany` dependencies work?
16. Explain backfill scheduling. Why should you specify a realistic `--time`?
17. What factors make up a job’s priority? What are a partition and a QoS?
18. What OS settings are applied on compute nodes, and why?
19. How do you take a node out for maintenance and bring it back? What does `down*` mean?

## Useful links

- Slurm documentation: <https://slurm.schedmd.com/documentation.html>
- Slurm 25.11 documentation: <https://slurm.schedmd.com/archive/slurm-25.11-latest/>
- Installing and configuring Slurm: <https://slurm.schedmd.com/archive/slurm-25.11-latest/quickstart_admin.html>
- `slurm.conf` parameters: <https://slurm.schedmd.com/archive/slurm-25.11-latest/slurm.conf.html>
- `sbatch` options: <https://slurm.schedmd.com/archive/slurm-25.11-latest/sbatch.html>
- MPI and Slurm: <https://slurm.schedmd.com/archive/slurm-25.11-latest/mpi_guide.html>
- Ubuntu Server documentation: <https://documentation.ubuntu.com/server/>
- Hyper-V on Windows: <https://learn.microsoft.com/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v>
- MUNGE: <https://dun.github.io/munge/>
