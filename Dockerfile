FROM iteam1337/node-gulp
WORKDIR /app
ADD package.json ./
RUN npm -s install -g bower
RUN npm -s install
ADD bower.json ./
RUN bower install --allow-root
ADD . ./
RUN ./node_modules/.bin/grunt build
RUN mv dist out