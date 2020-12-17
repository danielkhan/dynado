# DynaDo

This is a simple Todolist application that represents a simple [vue.js](https://vuejs.org/) based frontend and
a AWS Lambda based backend.

The frontend, after it was built, can be hosted statically.
The Lambda functions, as well as well as the Dynamodb used for persistence, can
be deployed via the [serverless framework](https://www.serverless.com/).

## Deploying the serverless infrastructure

Prerequisites: node.js and npm needs to be installed.

1. Install serverless: `npm install -g serverless`
2. Change into `todolist-lambda-backend`
3. run `npm install`
4. run `serverless deploy`

Keep the URLs of the created Lambda functions - you will need them to set up the frontend.

## Configuring the frontend

1. Open `todolist-frontend/src/api/index.js`
2. Set `baseurl` which is the URL part all Lambda functions of your deployment have in common.
   (If the URL of an individual function is `https://a12345678b.execute-api.us-east-1.amazonaws.com/dev/getTodos`, `baseurl` would be `https://a12345678b.execute-api.us-east-1.amazonaws.com/dev`)

## Running the frontend locally

Prerequisites: node.js and npm needs to be installed.

1. Change into `todolist-frontend`
2. run `npm install`
3. run `npm serve`

After that, the dist folder will contain the built application with ain `index.html` file as entry point.

## Building the frontend

Prerequisites: node.js and npm needs to be installed.

1. Change into `todolist-frontend`
2. run `npm install`
3. run `npm build`

After that, the dist folder will contain the built application with ain `index.html` file as entry point.

## Acknowledgements

- The frontend is based on [this sample app](https://github.com/Banderstadt/vue-todo-app).
- For the backend, [this article](https://medium.com/better-programming/store-fetch-from-dynamodb-with-aws-lambda-342d1785a5d0)
  served as a starting point.
