# devHive setup
---

<br/>

## Getting Started
### To Run Locally:
- in windows,

1. [install Docker Desktop](https://docs.docker.com/get-docker/)
2. Enable Kubernetes in the Docker Desktop
3. [Install Ingress Nginx](https://kubernetes.github.io/ingress-nginx/deploy/)\

- in ubuntu,

1. [install minikube](https://www.linuxbuzz.com/install-minikube-on-ubuntu/) 
2. enable ingress, 
```
 minikube addons enable ingress
```

### Optional

- [Install Skaffold](https://skaffold.dev/docs/install/)
  

1. start minikube

```
minikube start
```

2. Create the required secrets(env's) (example)

[env-example](https://github.com/iam-abin/devHive/blob/master/.env.example)

3. To apply configuration to a resource to create deployment, services and pods

- go to root folder

### for ingress deployments

```
kubectl apply -f k8s/ingress/dev/ingress-srv.yaml
```

### for stateful deployments

- if using mongodb atlat not necessary to apply the mongodb-srv yaml files inside the stateful folder,

#### for kafka deployments
``` 
kubectl apply -f k8s/stateful/kafka-deployment.yaml
```

- else

```
kubectl apply -f k8s/stateful/
```

### for stateless deployments

```
kubectl apply -f ./k8s/stateless
```

#### Skaffold (Optional)

### If Skaffold is installed run,

```
skaffold dev
```

---

## last

### get minikube ip,

```
minikube ip
``` 

### Setup /etc/hosts
```
sudo nano /etc/hosts - to open '/etc/hosts' file in nano editor
```

- add at last,

```
192.168.49.2 devhive.dev
```

here "192.168.49.2" is the minikube ip

ctrl+o - to save
press enter
ctrl x - to exit nano editor


### Open your browser and type 

```
https://ticketing.dev 
```

- to stop minikube context or cluster

```
minikube stop
```

### optional: To open minikube minikube dashboard to see kubernetes cluster information

1. if for the first time

```
minikube addons enable metrics-server
```

2. then

```
minikube dashboard
```

---

## some additional commands,

### kubernetes commands using kubectl

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

- to delete all pods ( also can be used for deployments and services by changing word 'pods' )

```
kubectl delete pods --all
```


### docker commands

### to bild an image for a service

```
docker build -t your_image_name:tag .
```
here,
- -t: Specifies the name and optionally a tag to the Docker image.
- your_image_name: The desired name for your Docker image.
- tag: An optional tag for versioning your Docker image. 
- '.': The path to the Dockerfile and context. '.' indicates the current directory.

eg:- if we want to create the image of auth service,

1. Go to the root directory of the service,
 cd auth
2. create image,
 docker build -t abin12334324/auth .


### to push the image to docker hub

1. Before pushing, make sure you are logged in to your Docker Hub account from command line,

```
docker login
```

2. After logging in, you can push the image:

```
docker push your_image_name:tag
```

eg:- docker push abin12334324/auth


# in production


### How To Set Up an Nginx Ingress on DigitalOcean Kubernetes Using Helm 

[click here](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-on-digitalocean-kubernetes-using-helm)


###  Securing the Ingress Using Cert-Manager  - (Using Helm )

[click here](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-on-digitalocean-kubernetes-using-helm#step-4-securing-the-ingress-using-cert-manager)
