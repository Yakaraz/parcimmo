# PARC_IMMO

## Getting Started

These instructions will get you a copy of the project

```
git clone git@github.com:Yakaraz/parcimmo.git
```

See deployment section below to deploy the project

### Prerequisites

- docker

### Installing

#### Prepare installation

##### API

- Copy `api/.env.dist` to `apps/api/.env` and edit it with custom values

##### Client

- Copy `client/.env.dist` to `apps/pwa/.env` and edit it with custom values

#### Make installation

##### API & BDD

start project by using Docker

```bash
./parcimmo-service initialize
```

NOTE : Actually the front is not included in the docker-compose due to lack of time.

you can start front project manually instead

```bash
cd client && yarn start
```

##### Credentials

admin : password
user1 : password
user2 : password
user3 : password
user4 : password
user5 : password
user6 : password

## Contributors

### Developers

- **BARRAUD Romain** - Initial work
