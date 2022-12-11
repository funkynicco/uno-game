FROM ubuntu:22.04 AS build
ARG BUILD_NUMBER

# Install dependencies
RUN apt-get update ; apt-get install curl -y ; curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && apt-get install -y nodejs

WORKDIR /build/frontend
COPY ./frontend/ .

RUN npm install && npm run build

################################################################

FROM nginx:1.23.2

WORKDIR /usr/share/nginx/html
COPY --from=build /build/frontend/build .
