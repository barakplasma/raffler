# Directus on Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/barakplasma/raffler)

## alternative: docker compose

```yaml
version: '3'
services:
  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    volumes:
      - uploads:/directus/uploads
    environment:
      KEY: '255d861b-5ea1-5996-9aa3-922530ec40b1' # use docker compose secrets instead
      SECRET: '6116487b-cda1-52c2-b5b5-c8022c45e263' # use docker compose secrets instead

      DB_CLIENT: 'postgres'
      DB_HOST: 'postgres'
      DB_PORT: 5432
      DB_DATABASE: 'directus'
      DB_USER: 'directus'
      DB_PASSWORD: 'directus'


      ADMIN_EMAIL: 'barakplasma@gmail.com'
      ADMIN_PASSWORD: 'd1r3ctu5' # use docker compose secrets instead
    depends_on:
      - postgres

  postgres:
    image: postgis/postgis
    volumes:
      - postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=directus
      - POSTGRES_PASSWORD=directus # use docker compose secrets instead
      - POSTGRES_DB=directus
    # run the following on the postgis image to add postgis: docker exec bash; psql -U directus; CREATE EXTENSION postgis;

volumes:
  postgres:
  uploads:
```
To backup / restore your Render.com postgres db (free one deletes itself in 90 days) try something like https://docs.bit.io/docs/exporting-and-restoring-data-via-pg_dump-and-pg_restore using the render.com connection string with pg_dump and pg_restore .

comment out the docker compose part for directus and setup the db first if you want to use my data
docker cp data/raffler.sql raffler_postgres_1:/home/raffler.sql
in the container
root@36714e21bde5:~/# psql -U directus < /home/raffler.sql
