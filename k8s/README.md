# devHive


### How To Set Up an Nginx Ingress on DigitalOcean Kubernetes Using Helm 

[click here](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-on-digitalocean-kubernetes-using-helm)


###  Securing the Ingress Using Cert-Manager  - (Using Helm )

[click here](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-on-digitalocean-kubernetes-using-helm#step-4-securing-the-ingress-using-cert-manager)



## Getting Started
### Run Locally: Docker Desktop or minikube

### Pre-Requirements Installations

- [Docker Desktop](https://docs.docker.com/get-docker/)
- Enable Kubernetes in the Docker Desktop
or 
- [minikube](https://www.linuxbuzz.com/install-minikube-on-ubuntu/)

- [Install Ingress Nginx](https://kubernetes.github.io/ingress-nginx/deploy/)
- [Install Skaffold](https://skaffold.dev/docs/install/) - Optional
- Add careerconnect.dev to your hosts file pointing to 127.0.0.1 (Mac & Linux /etc/hosts and Linux)

```
### Create the required secrets (example)
kubectl create secret generic careerconnect-base-url --from-literal=BASE_URL=<---your_jwt_secret_value--->
kubectl create secret generic careerconnect-jwt-secret --from-literal=JWT_KEY=<---your_jwt_secret_value--->
kubectl create secret generic careerconnect-gmail-secret --from-literal=GMAIL_PASSWORD=<---your_gmail_secret_value--->       //for node mailer
kubectl create secret generic careerconnect-admin-secret --from-literal=ADMIN_PASSWORD=<---your_admin_password--->
kubectl create secret generic careerconnect-firebase-api-key --from-literal=FIRE_BASE_API_KEY=<---your_admin_secret_value--->
kubectl create secret generic careerconnect-mongo-uri --from-literal=MONGO_URI_ATLAS=<---your_mogo_db_altas_uri--->
kubectl create secret generic careerconnect-cloudinary-config --from-literal=CLOUD_NAME=<--your_cloud_name--> --from-literal=API_KEY=<--your_cloud_key--> --from-literal=API_SECRET=<--your_cloud_api_secreat-->
kubectl create secret generic careerconnect-google-oauth  --from-literal=CLIENT_SECRET=<--your_client_secret--> --from-literal=CLIENT_ID=<--your_client_id-->

Note: If you have Stripe Account
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<REPLACE_HERE_YOUR_PRIVATE_STRIPE_KEY>
If you don't have a Stripe Account
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=123456

#### Skaffold (Optional)

# If Skaffold is installed
skaffold dev

If Skaffold is not installed
kubectl apply -f k8s/ingress/dev/ingress-srv.yaml
kubectl apply -f k8s/stateless/

- if using mongodb atlat not necessary to apply the mongodb-srv yaml files,
kubectl apply -f k8s/stateful/kafka-deployment.yaml
- else
kubectl apply -f k8s/stateful/


### Setup /etc/hosts
$ sudo nano /etc/hosts - to open '/etc/hosts' file in nano editor

add,

192.168.49.2 devhive.dev

here "192.168.49.2" is the minikube ip

ctrl+o - to save
press enter
ctrl x - to exit nano editor


### Open your browser and type  https://ticketing.dev 

<!-- ########################################################################################################## -->

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