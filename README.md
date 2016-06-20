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

## Demo

![alt text](https://raw.githubusercontent.com/MyPureCloud/schedule-callback-example/master/demo.gif "Schedule Callback Example - Demo")


## Setting up PureCloud OAuth2 Grant

In order for this example to function properly, you'll need to create an OAuth2 grant that will essentially allow the application to authenticate into PureCloud (Similar to how users can login, but the application has no user, so it must login a different way).

First, you'll need to make sure your user has any roles that you want to provide to the application (you may need to create new roles for the app, but make sure you give yourself the role too).  The application needs roles in the same way a user does.  Once you have these roles, you'll need to login to PureCloud and navigate to

> Admin -> Integrations -> OAuth

and click the "Add Client" Button.  Fill in the "App Name" and "Description" fields, and Under "Grant Types" select "Client Credentials".  Then under "Roles" add any roles you want to grant the application.  

Upon saving you should see two new read-only fields appear: "Client Id" and "Client Secret".  These string values will need to be placed in the file `schedule-callback-example/service/src/services/pureCloud/pureCloudAppLogin.js`.


## Setting up the callback queue (and possibly scriptId).

Navigate to `schedule-callback-example/client/src/widgets/ScheduleCallbackWidget.js`, and locate the function named `getScheduleCallbackDataFromDialogDomElement`.  Inside that function you'll see the construction of an `data` variable object.  That object has the fields `queueId` and also `scriptId`.  Get the queueId of your desired queue from the PureCloud public-api, and set it on the corresponding `queueId` property.  If you'd like to use a script other than the default script, you'll want to set to `scriptId` here as well. You may decide that this information is better suited on the service (instead of the client) if it is always going to be the same queue and/or script, but it was left in the client code in case you want to add in functionality to select a queue and or script from other context in the client.
