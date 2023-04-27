# Directus on Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/barakplasma/raffler)

## alternative: docker compose
You can use docker compose for working locally.

`docker-compose up`
and in a separate terminal
`~/Projects/raffler/extensions/displays/photo-url$ npm run dev`

To backup / restore your Render.com postgres db (free one deletes itself in 90 days) try something like https://docs.bit.io/docs/exporting-and-restoring-data-via-pg_dump-and-pg_restore using the render.com connection string with pg_dump and pg_restore .

comment out the docker compose part for directus and setup the db first if you want to use my data
docker cp data/raffler.sql raffler_postgres_1:/home/raffler.sql
in the container
root@36714e21bde5:~/# psql -U directus < /home/raffler.sql
