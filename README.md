# microevents

## Postgres

This step is optional if you already have an instance of postgres running.

In this case, we'll need the `database`, the `user` and `password`.

Inside the `microevents-docker` directory:
```sh
docker swarm init
docker stack deploy -c stack.yml microevents-postgres
```

## API

If you're using the postgres instance as provided with this repo (see above), no need for change. Otherwise search for `app.module.ts` and adjust your postgres settings (`database`, the `user` and `password`).

Inside the `microevents-api` directory:
```sh
yarn install
yarn start:dev
```

The API is running at `http://localhost:3000/graphql`.

## WEB

Inside the `microevents-web` directory:
```sh
yarn install
yarn dev
```

## Author:
Pawel Sawicki <info@reactlernen.de>
LinkedIn: https://www.linkedin.com/in/sawickipawel/




