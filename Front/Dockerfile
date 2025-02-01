FROM alpine:3.21

RUN apk update && apk add --no-cache \
    nodejs-current \
    npm 

WORKDIR /workspace
COPY package*.json ./
RUN npm i
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "start"]