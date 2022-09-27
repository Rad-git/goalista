# syntax=docker:dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /backend
COPY . .
RUN yarn install --production
CMD ["node", "frontend/sec/index.js"]
EXPOSE 5000