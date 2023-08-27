This is a Monorepo for the mixo project using [TURBOREPO](https://turbo.build/repo/).

### TLDR:
This allows us to run all our apps with 
```
yarn dev
```
and lint everything with our custom eslint config with
```
yarn lint
```
and format with
```
yarn format
```

## Getting Started
1. Clone the repo
2. Ensure you have node >18 installed 
3. Install dependencies using [yarn](https://yarnpkg.com/), the easiest way to get the `yarn` command from npm is `npm install --global yarn`
  Run `yarn` to install all dependencies in the base repo
4. Run `yarn setup` to install all dependencies in the apps
5. Run `yarn dev` to start all the apps in development mode

## Adding a new app
1. add the app to the `/apps` directory
2. inside the app, give it access to the shared packages inside the package.json // expand on this

## Apps in this repo
1. mixo-mate-frontend - a nextjs app for frontend, locally runs on port 4000 by default
2. mixo-mate-backend - a backend API server, locally runs on port 3000 by default
