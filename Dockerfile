FROM node:12.13-alpine As development

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --unsafe-perm

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

RUN npm rebuild bcrypt --build-from-source

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
