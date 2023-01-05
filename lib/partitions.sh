#!/bin/bash

username=$1
# get the partition name and TRES value of the private partitions for a specific user
cmd="for ACCOUNT in $(sacctmgr show user name=$username -s -n -p | cut -d\| -f5); do scontrol show partition -o | egrep \$ACCOUNT | cut -d' ' -f1,33; done;"
eval $cmd
