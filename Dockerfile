FROM golang:1.22-alpine as k6-builder

WORKDIR /app

ENV CGO_ENABLED 0

RUN go install go.k6.io/xk6/cmd/xk6@latest

RUN xk6 build \
    --with github.com/grafana/xk6-browser
    
FROM alpine:3.18 as release

RUN apk add --no-cache \
  chromium-swiftshader \
  ca-certificates \
  nodejs \
  npm 

# Install build dependencies for k6
COPY --from=k6-builder /app/k6 /bin/

WORKDIR /app

COPY ./ ./

# Install Node.js dependencies
RUN npm ci --loglevel verbose

USER root


ENV CHROME_BIN=/usr/bin/chromium-browser

ENV CHROME_PATH=/usr/lib/chromium/

ENV K6_BROWSER_HEADLESS=true
# no-sandbox chrome arg is required to run chrome browser in
# alpine and avoids the usage of SYS_ADMIN Docker capability
ENV K6_BROWSER_ARGS=no-sandbox

ENV XK6_BROWSER_LOG="fatal"

ENV K6_BROWSER_LOG="error"

ENV ENVIRONMENT="production"
