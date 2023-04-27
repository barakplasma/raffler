FROM directus/directus:10
COPY ./extensions /directus/extensions
WORKDIR /directus/extensions/displays/photo-url
RUN npm install
RUN npm run build
WORKDIR /directus
