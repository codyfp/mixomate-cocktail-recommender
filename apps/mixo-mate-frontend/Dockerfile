FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN yarn

# Copy source code into image
COPY . .

# Start Next.js in development mode based on the preferred package manager
CMD yarn dev