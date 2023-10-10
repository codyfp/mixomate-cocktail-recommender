FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock* package-lock.json* ./

RUN yarn

# Bundle app source
COPY . .

CMD [ "yarn", "start" ]
