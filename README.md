# devHive

## About
This application is built using MERN stack and microservices to be deployed in kubernetes cluster.
This is a Job Finding Application For software developers.


## env variables

#### to create a secret or env variable,

```
kubectl create secret generic NAME_OF_THE_SECRET_KEY --from-literal=KEY=VALUE_FOR_THE_KEY
```

#### api prefix

API_PREFIX = 'api prifix' eg:- /api/v1

#### jwt secret

JWT_SECRET_KEY = "your jwt secret"

#### twilio otp sending and verification

TWILIO_ACCOUNT_SID = 'your_twilio_sid'
TWILIO_AUTH_TOKEN = 'your_twilio_auth_token'
TWILIO_SERVICE_SID = 'your_twilio_service_sid'

#### mongo atlas utls(Not necessary)

MONGO_URL_AUTH = "authentication db url"
MONGO_URL_ADMIN = "admin db url"
MONGO_URL_PROFILE = "profile db url"


