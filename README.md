# reactjs-personal-diary
Build a React-based Personal Diary App with User Authentication and GitHub Actions
## Table of Contents

- [Authentication and Authorisation](#auth)
- [Installing](#install)
- [Getting started Prerequisites](#prereq)
- [Review of backend dependencies](#backend-dependencies)
- [Review of frontend dependencies](#frontend-dependencies)
- [How to setup](#how-to)

## Authentication and Authorisation <a name = "auth"></a>

User authentication and authorization are both an important part of modern application development. Although they are often used interchangeably, their purposes are quite different.

<b>User Authentication</b> refers to the determination of who the users are—or establishing their identity.
<b>User Authorization</b> refers to the level(s) of access users can have, or their permissions—that is, what they’re allowed to do.


## Getting started Prerequisites <a name = "prereq"></a>

> Tools, that should be installed on your OS:
+ Working [Node.js](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/).
+ Installed and Running [MongoDB](https://www.sitepoint.com/an-introduction-to-mongodb/).
+ Installed [Postman App](https://www.postman.com/downloads//), which will be used for testing our API endpoints.

## Review of dependencies <a name = "backend-dependencies"></a>

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

## Review of frontend dependencies <a name = "frontend-dependencies"></a>

> npm install axios react-router-dom react-mde showdown

+ <b>react-router-dom</b> provides DOM bindings for React Router.
+ <b>axios</b> is an HTTP client used for making server requests.
+ <b>react-mde</b> is a simple Markdown editor, which we’ll use for note writing and editing.
+ <b>showdown</b> is a bidirectional Markdown-to-HTML to Markdown converter, which we’ll use in conjunction with react-mde.

### How to setup project <a name = "how-to"></a>

Start the MongoDb server
If it is installed and path of MongoDB bin folder is added to the Environment Variables Path
```
mongod
```

Start the backend
From the  <b>diary-backend</b> folder run:

```
npm start
```

Start the application
From the  <b>diary-frontend</b> folder run:

```
npm start
```
