# schedule-callback-example
This repo contains a simple example service that will authenticate into PureCloud and make the appropriate api calls to schedule a callback. In addition to the service, this repo contains a simple example client demonstrating how to wire up a minimal UI to interact with the service.

## Setup

### Install Node.js:
#### Official website
    https://nodejs.org/en/
#### Recommended Node.js installer - nvm (Node Version Manager)
    https://github.com/creationix/nvm
#### This project was built using:
    * node v6.1.0
    * npm 3.8.6

### Install npm globals
#### Run the following terminal commands (from anywhere)
```shell
npm install gulp -g
npm install bower -g
```

### Install project npm dependencies
#### Run the following terminal commands (from the root directory of the project)
```shell
npm install
bower install
```

### Running
#### Service
```shell
gulp service
```

#### Client
```shell
gulp client
```

#### Both Client and Service
```shell
gulp start
```

#### Gulp Tasks List
```shell
gulp
```
