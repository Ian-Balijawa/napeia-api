# NAPEIA-RESTFUL API
 [![Node.js CI](https://github.com/Ian-Balijawa/napeia-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/Ian-Balijawa/napeia-api/actions/workflows/node.js.yml)

![example workflow](https://github.com/rzgry/Express-REST-API-Template/actions/workflows/node.js.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Express-REST-API-Template

ExpressJs api based off of [express-generator](https://expressjs.com/en/starter/generator.html). Includes [eslint](https://eslint.org) and [prettier](https://prettier.io) for linting/code formatting, [nodemon](https://github.com/remy/nodemon) for automatic server restarting, and [Jest](https://jestjs.io) for testing.

## Getting Started

## Introduction

This project is the backend of NPEIA, NATIONAL PRIVATE EDUCATION INSTITUTION ASSCIATION,
an organisation that manages Privates schools in Uganda.

This is the implementation of The NPEIA RESTFUL-API in Node.js.

## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Yarn package manager is recommended as this project contains yarn.lock file and it's a bad practice to mix up package managers.

### Install yarn globally using npm

```
npm i -g yarn
```

### Install the Dependencies

Next, from the project folder, install the dependencies:

    yarn i / npm i

### Populate the Database

    node seed.js

### Run the Tests

You're almost done! Run the tests to make sure everything is working:

    yarn test

All tests should pass.

### Running in development

```
yarn run dev
```

### Running in production

```
yarn start
```

Runs on localhost:3000 by default but can be configured using the `PORT` environment variable.

### Running tests

```
yarn test

# Watch repo
yarn run test:watch
```

### Linting

```
yarn run lint

# fix issues
yarn run lint:fix
```

### Start the Server

    yarn run dev

This will launch the Node server on port 5500. If that port is busy, you can set a different point in config/default.json.

Open up your browser and head over to:

# http://localhost:5500/api/schools

You should see the list of schools. That confirms that you have set up everything successfully.

## Environment Variables (Optional)

If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

On Mac:

    export napeia_jwtPrivateKey=yourSecureKey

On Windows:

     set napeia_jwtPrivateKey=yourSecureKey
