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
5. Run `docker version` to check if you have Docker installed (install it otherwise)
6. Run `docker compose up` to start all the apps

## Import dataset into mongodb

Run the following commands on your host machine to import datasets into MongoDB.

```Bash
docker exec mongo mongoimport \
  --collection=cocktailclasses \
  --file=/opt/datasets/cocktailclasses \
  --authenticationDatabase=admin \
  --uri mongodb://root:pass12345@mongo:27017/test?ssl=false

  docker exec mongo mongoimport \
  --collection=ingredientclasses \
  --file=/opt/datasets/ingredientclasses \
  --authenticationDatabase=admin \
  --uri mongodb://root:pass12345@mongo:27017/test?ssl=false
```

## Adding a new app
1. add the app to the `/apps` directory
2. inside the app, give it access to the shared packages inside the package.json // expand on this

## Apps in this repo
1. mixo-mate-frontend - a nextjs app for frontend, locally runs on port 3000 by default
2. mixo-mate-backend - a backend API server, locally runs on port 4000 by default

## Setting up Chromedriver
This project uses Chromedriver for browser automation. Since .exe files are platform-specific and to keep the repository light, we don't include the Chromedriver executable directly in the repository. Here's how to set it up:

**Installation** 
1. Visit the Chromedriver [download page](https://sites.google.com/a/chromium.org/chromedriver/downloads).
2. Download the version corresponding to your Chrome browser.
3. Unzip the downloaded file to retrieve chromedriver.exe (or just chromedriver for macOS/Linux).
4. Place the chromedriver.exe in a suitable directory.
5. Set the path to chromedriver.exe in the juypter notebook or add the directory containing the executable to your system's PATH.