Please follow these steps to run the project

Build docker containers

```bash
docker-compose build
```

Create new database. Note: skip this step if database existed

```bash
docker-compose run api yarn db:create
```

Apply migrations

```bash
docker-compose run api yarn db:run
```

Start the app

```bash
docker-compose up