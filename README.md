<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

This is a repository dedicated to my microservice architecture with kafka and postgreSQL.

# Running the application

## Installation

```bash
$ yarn install
```

## Running the PostgreSQL database and Kafka

```
$ cd docker/

$ docker-compose -f docker-compose-1.yml up -d
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Running with kubernetes

## Installation

```bash
$ docker build -f user-engine/Dockerfile . -t user-engine

$ docker build -f authentication-engine/Dockerfile . -t authentication-engine

$ docker build -f encryption-engine/Dockerfile . -t encryption-engine

$ docker build -f product-engine/Dockerfile . -t product-engine

$ docker build -f app/Dockerfile . -t app

$ cd docker/

$ kubectl apply -f postgres-config-map.yaml,postgres-storage.yaml,zookeeper-stack.yaml

$ kubectl apply -f postgres-stack.yaml,kafka-cluster-stack.yaml

$ kubectl apply -f postgres-job.yaml

$ kubectl apply -f app-stack.yaml,authentication-stack.yaml,encryption-stack.yaml,user-stack.yaml
```

## Kubernetes Dashboard

```bash
# Applying kubernetes dashboard
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml

# Creating a secure channel to our Kubernetes cluster
$ kubectl proxy

# Creating admin user for login purpose
$ kubectl apply -f dashboard-stack.yaml

# Generating token for login purpose
$ kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
```

## Access:

```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```