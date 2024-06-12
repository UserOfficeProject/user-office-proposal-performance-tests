FROM golang:1.22-alpine as k6-builder
WORKDIR $GOPATH/src/go.k6.io/k6
ADD . .
RUN apk --no-cache add build-base git
RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN CGO_ENABLED=1 xk6 build \
    --with github.com/UserOfficeProject/user-office-proposal-performance-tests/extensions/xk6-sql-connector="$PWD/extensions/xk6-sql-connector" \
    --with github.com/grafana/xk6-browser@v1.4.3 \
    --output /tmp/k6

FROM node:22-alpine AS  K6-test-build

WORKDIR /app
COPY package*.json /src webpack.config.js ./
RUN npm ci
RUN npm run build

FROM alpine:3.18.6 as release

# Download and install Oracle Instant Client
RUN apk --no-cache add libaio libnsl libc6-compat curl && \
    cd /tmp && \
    curl -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip -SL && \
    unzip instantclient-basiclite.zip && \
    mv instantclient*/ /usr/lib/instantclient && \
    rm instantclient-basiclite.zip && \
    ln -s /usr/lib/instantclient/libclntsh.so.21.1 /usr/lib/libclntsh.so && \
    ln -s /usr/lib/instantclient/libocci.so.21.1 /usr/lib/libocci.so && \
    ln -s /usr/lib/instantclient/libociicus.so /usr/lib/libociicus.so && \
    ln -s /usr/lib/instantclient/libnnz21.so /usr/lib/libnnz21.so && \
    ln -s /usr/lib/libnsl.so.2 /usr/lib/libnsl.so.1 && \
    ln -s /lib/libc.so.6 /usr/lib/libresolv.so.2 && \
    ln -s /lib64/ld-linux-x86-64.so.2 /usr/lib/ld-linux-x86-64.so.2

ENV LD_LIBRARY_PATH /usr/lib/instantclient

RUN apk add --no-cache \
  chromium-swiftshader \
  ca-certificates 
# Install build dependencies for k6
COPY --from=k6-builder /tmp/k6 /bin/

ENV CHROME_BIN=/usr/bin/chromium-browser

ENV CHROME_PATH=/usr/lib/chromium/

ENV K6_BROWSER_HEADLESS=true
# no-sandbox chrome arg is required to run chrome browser in
# alpine and avoids the usage of SYS_ADMIN Docker capability
ENV K6_BROWSER_ARGS=no-sandbox
ENV K6_BROWSER_LOG="error"
ENV ENVIRONMENT="develop"
ENV XK6_BROWSER_LOG="fatal"
ENV K6_TEST="sc1-load-test"

RUN adduser -D -u 12345 -g 12345 k6

USER k6

WORKDIR /app

COPY --from=K6-test-build /app/test/* ./

CMD ["sh","-c","./${K6_TEST}"]
