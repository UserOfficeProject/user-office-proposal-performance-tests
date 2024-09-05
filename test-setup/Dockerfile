FROM node:20-slim AS build-stage

WORKDIR /workdir

COPY package.json package-lock.json build.mjs tsconfig.json ./

RUN npm ci --loglevel error --no-fund

COPY src ./src

RUN npm run build

FROM oraclelinux:8

RUN dnf -y module enable nodejs:20 && \
    dnf -y install oracle-instantclient-release-el8 oraclelinux-developer-release-el8 && \
    dnf -y install oracle-instantclient-basic node-oracledb-node20 nodejs npm && \
    rm -rf /var/cache/dnf

WORKDIR /usr/src/app

COPY --from=build-stage  /workdir/build ./build
COPY --from=build-stage  /workdir/package*.json ./

RUN npm ci --only=production --loglevel error --no-fund


EXPOSE 8100

CMD ["node", "build/index.js"]