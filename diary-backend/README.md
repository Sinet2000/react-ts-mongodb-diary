# reactjs-personal-diary
Build a React-based Personal Diary App with User Authentication and GitHub Actions
## Table of Contents

- [Authentication and Authorisation](#auth)
- [Installing](#install)
- [Getting started Prerequisites](#prereq)
- [Review of dependencies](#dependencies)

## Authentication and Authorisation <a name = "auth"></a>

User authentication and authorization are both an important part of modern application development. Although they are often used interchangeably, their purposes are quite different.

<b>User Authentication</b> refers to the determination of who the users are—or establishing their identity.
<b>User Authorization</b> refers to the level(s) of access users can have, or their permissions—that is, what they’re allowed to do.


## Getting started Prerequisites <a name = "prereq"></a>

> Tools, that should be installed on your OS:
+ Working [Node.js](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/).
+ Installed and Running [MongoDB](https://www.sitepoint.com/an-introduction-to-mongodb/).
+ Installed [Postman App](https://www.postman.com/downloads//), which will be used for testing our API endpoints.

## Review of dependencies <a name = "dependencies"></a>

> npm install --save express body-parser cors bcryptjs jsonwebtoken mongoose nodemon

+ <b>express</b> is a Node.js web application framework used for creating servers easily.
+ <b>body-parser</b> is a package for parsing the body part of the server request.
+ <b>cors</b> is a package we’ll use to allow cross-origin resource sharing (CORS). In other words, the communication between the back end and front end.
+ <b>bcryptjs</b> is used to securely store passwords in a database
+ <b>jsonwebtoken</b> is an implementation of [JSON Web Tokens](https://jwt.io/introduction/). We’ll use it for generating and verifying a user-access token.
+ <b>mongoose</b> is an object data modeling (ODM) library that we’ll use to connect to MongoDB.
+ <b>nodemon</b> is a utility tool that will automatically restart your server after any changes have occurred.

To add support for writing modern JS code, that will be compiled to JS
> npm install --save-dev @babel/core @babel/node @babel/cli @babel/preset-env

Give the instruct the app to transpile the code (add in package.json -> scripts)
> "start": "nodemon --exec babel-node ./index.js"

### Installing <a name = "install"></a>

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo.

## Usage <a name = "usage"></a>

Add notes about how to use the system.
