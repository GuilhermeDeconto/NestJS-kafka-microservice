#!/bin/sh
kubectl apply -f postgres-config-map.yaml,postgres-storage.yaml,zookeeper-stack.yaml

sleep 70

kubectl apply -f postgres-stack.yaml,kafka-cluster-stack.yaml

sleep 40

kubectl apply -f postgres-job.yaml

sleep 30

kubectl apply -f app-stack.yaml,authentication-stack.yaml,encryption-stack.yaml,user-stack.yaml