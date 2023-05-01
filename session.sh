# Recorded with the doitlive recorder
#doitlive shell: /bin/bash
#doitlive prompt: default
#doitlive prompt: sorin
rm -rf /tmp/dir-ext

mkdir /tmp/dir-ext

cd /tmp/dir-ext

pnpm create directus-extension

code photourl

cp -r /tmp/dir-ext/photourl/dist/index.js /home/michael/Projects/raffler/extensions/displays/photourl

cd /home/michael/Projects/raffler

tree -L 5 -I node_modules

docker-compose up