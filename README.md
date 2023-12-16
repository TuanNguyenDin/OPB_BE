# OPB_BE
The NestJS BE project for an online party booking system.
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installing MongoDB

Here are instructions for installing MongoDB on popular operating systems such as Windows, macOS, and Linux.

### Windows

1. Visit MongoDB official website [here](https://www.mongodb.com/try/download/community) and download the version suitable for your Windows operating system.

2. Run the downloaded installation file and follow the installation steps in the MongoDB installer.

3. MongoDB will be installed and ready to use.

### macOS

1. Using Homebrew, open Terminal and run the following command:
    ```bash
    brew tap mongodb/brew
    brew install mongodb-community
    ```

2. Run MongoDB using the command:
    ```bash
    mongod --config /usr/local/etc/mongod.conf --fork
    ```

3. MongoDB will be installed and ready to use.

### Linux (Ubuntu)

1. Open Terminal and run the following commands:
    ```bash
    sudo apt update
    sudo apt install -y mongodb
    ```

2. Start MongoDB:
    ```bash
    sudo systemctl start mongodb
    ```

3. MongoDB will be installed and ready to use.

### Check settings

1. Open Terminal or Command Prompt and run the following command to check MongoDB version:
    ```bash
    mongo --version
    ```

2. You will see the current MongoDB version.  

## Installation

```bash
$ npm install
```

##  Set up environment variables

Create .env file and add appropriate variables in order to use the app.
Create account vnpay to get VNP_HASH_SECRET, VNP_TMNCODE. [here](https://sandbox.vnpayment.vn/devreg)
```bash
DATA_BASE=<your database url here>
JWT_SECRET=<set up your secret key>
EXPIRES_IN_SECONDS= <jwt uptime>

VNP_TMNCODE=<VNPAY TMN CODE> 
VNP_HASH_SECRET=<VNP_HASH_SECRET CODE>
VNP_RETURN_URL=<Your url return>
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
