# Recorded with the doitlive recorder
#doitlive shell: /bin/bash
#doitlive prompt: default
#doitlive prompt: sorin
rm -rf /tmp/dir-ext

mkdir /tmp/dir-ext

cd /tmp/dir-ext

npm init directus-extension

code photo-url

cd /home/michael/Projects/raffler

tree -L 2 -I node_modules ./extensions/displays/photo-url

docker-compose up