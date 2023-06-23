# trippee

# FIND YOUR TRAVEL PARTNER FOR SHORT TRIPS.

## Setup Postgres Instance using docker

```docker run --name some-postgres -e POSTGRES_PASSWORD=postgres  -d postgres```

## Create Migrations
```knex migrate:make table_name ```

## Run Migrations
```knex migrate:latest```

## Create Seeds
```knex seed:make seed_name```

## Run Seeds
```knex seed:run```

## Rollback Migrations
``` knex migrate:rollback```

REFERENCES:

https://towardsdatascience.com/how-to-run-postgresql-and-pgadmin-using-docker-3a6a8ae918b5