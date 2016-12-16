FROM node:alpine
COPY ./build /opt/app
WORKDIR /opt/app

# Add Yarn

RUN mkdir -p /opt
ADD yarn.tar.gz /opt/
RUN mv /opt/dist /opt/yarn
ENV PATH "$PATH:/opt/yarn/bin"

# Install packages using Yarn

ADD package.json /tmp/package.json
# RUN cd /tmp && yarn
# RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

# RUN node server.js