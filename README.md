# devHive

## About
This application is built using MERN stack and microservices to be deployed in kubernetes cluster.
This is a Job Finding Application For software developers.


### env variables

##to create a secret of env variable,

```
kubectl create secret generic NAME_OF_THE_SECRET_KEY --from-literal=KEY=VALUE_FOR_THE_KEY
```

API_PREFIX = 'api prifix' eg:- /api/v1