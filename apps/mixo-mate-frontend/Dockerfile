FROM node:18-alpine

# hadolint ignore=DL3018
RUN apk --no-cache --update add bash curl vim git
SHELL ["/bin/bash", "-o", "pipefail", "-o", "errexit", "-u", "-c"]

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN yarn

# Copy source code into image
COPY . .

# Start Next.js in development mode based on the preferred package manager
CMD yarn dev
