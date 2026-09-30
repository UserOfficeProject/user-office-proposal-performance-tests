FROM node:24-slim AS build-stage

WORKDIR /workdir

COPY package.json package-lock.json ./

RUN npm ci --loglevel error --no-fund

COPY . .

RUN npm run generate:uows && \
    npm run build && \
    npm prune --omit=dev

FROM node:24-slim

WORKDIR /usr/src/app

COPY --from=build-stage /workdir/node_modules ./node_modules
COPY --from=build-stage /workdir/build ./build
COPY --from=build-stage /workdir/package.json ./

EXPOSE 8100

CMD ["node", "build/index.js"]
