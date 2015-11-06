FROM iteam1337/node-gulp
WORKDIR /app
ADD package.json ./
RUN npm -s install -g bower
RUN npm install
RUN bower install
RUN ./node_modules/.bin/grunt build
RUN cp -r out /app/dist
