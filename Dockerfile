FROM node:13

WORKDIR /user/app/
COPY . /user/app/
RUN npm ci --only=production
EXPOSE 8080
CMD [ "node", "src/index.js" ]
