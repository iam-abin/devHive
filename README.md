# devHive

## About
This application is built using MERN stack and microservices to be deployed in kubernetes cluster.
This is a Job Finding Application For software developers.


## env variables

#### to create a secret or env variables,

```
kubectl create secret generic NAME_OF_THE_SECRET_KEY --from-literal=KEY=VALUE_FOR_THE_KEY
```

eg:- kubectl create secret generic auth-api-key --from-literal=AUTH_API_KEY=1234567890


### To open minikube minikube 

1. if for the first time

```
minikube addons enable metrics-server
```

2. then

```
minikube dashboard
```


### steps to start

1. start minikube

```
minikube start
```

2.  to apply configuration to a resource to create deployment, services and pods

- go to root folder

- for ingress deployments

```
kubectl apply -f ./k8s/ingress
```
- for stateful deployments

```
kubectl apply -f ./k8s/stateful
```
- for stateless deployments

```
kubectl apply -f ./k8s/stateless
```

- to see deployments 

```
kubectl get deployments
```
- to see services 

```
kubectl get services
```
- to see pods 

```
kubectl get pods
```    
- to see pods in another namespace( ingress is on another namespace )

```
kubectl get namespaces
```

```
kubectl get pods -n namespace_name
```    

- to delete all pods ( also can be used for deployments and services by changing 'pods' )

```
kubectl delete pods --all
```


## docker commands

### to bild an image for a service
- Go to the root directory of the service,

```
docker build -t your_image_name:tag .
```

here,
- -t: Specifies the name and optionally a tag to the Docker image.
- your_image_name: The desired name for your Docker image.
- tag: An optional tag for versioning your Docker image. 
- '.': The path to the Dockerfile and context. '.' indicates the current directory.

eg:- docker build -t abin12334324/auth .

### to push the image to docker hub

1. Before pushing, make sure you are logged in to your Docker Hub account

```
docker login
```

2. After logging in, you can push the image:

```
docker push your_image_name:tag
```