# Directus on Render

[![Deploy to Render](http://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

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
