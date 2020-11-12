FROM node:14.15.0

ARG USERNAME=node

RUN apt-get update \
  && apt-get install -y sudo bash \
  && echo "$USERNAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME

RUN mkdir -p /app \
  && chown -R $USERNAME /app

USER $USERNAME

WORKDIR /app

ENV SHELL=/bin/bash
