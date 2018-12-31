FROM node:alpine

LABEL name="Mike Erickson"
LABEL maintainer="codedungeon@gmail.com"

# create directory in container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy any files necessary for including modules
COPY package.json /usr/src/app/

# install node modules, this should be done with yarn instead
RUN yarn install

# copy over files to container (node_modules should be ignored as deifned in .dockerignore)
COPY . /usr/src/app

# this is not required as the container is not hosting any network resoruces
# ENV PORT 3000
# EXPOSE ${PORT}

# kick off the tests
CMD [ "yarn","run", "test" ]

# run container as follows
# docker run  --name debug-ci -v$(pwd):/usr/src/app --rm -it dev-node ash