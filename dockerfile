FROM node:20-alpine AS build

# Set the source folder
ARG SOURCE_FOLDER="./"
ARG BUILD_VERSION
ARG NPM_TOKEN
ARG CONFIGURATION

# Create app directory
WORKDIR /var/www/app

# Bundle app source
COPY ${SOURCE_FOLDER} .

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc  && \
    npm ci --no-optional  && \
    NODE_OPTIONS=--max_old_space_size=4096 npm run build -- --configuration $CONFIGURATION && \
    rm -f .npmrc

FROM labshare/docker-base-web 
COPY --from=build /var/www/app/dist/dbTools-client /var/www/app

# docker build -t dbTools-client:current --build-arg NPM_TOKEN=xxx .