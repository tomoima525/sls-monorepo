# What's this?

An experimental monorepo project to showcase how to build serverless service using serverless.com

# Functionality

This is a simple web app that allows a user to sign up/login and pos their notes

### Authentication

![](https://github.com/tomoima525/sls-monorepo/blob/main/sign_up.gif)

- Authentiation is build with Cogito User Pool
- Cognito Identity Pool is also implemented so that we can manage data object on S3(but not used in this project)
- Frontend Authentication is implemented with Amplify because that was the easiest way to handle the authorization process.

### Notes

![](https://github.com/tomoima525/sls-monorepo/blob/main/add_note.gif)

- Authorized user can post and see their notes
- Requests are implemented with Amplify. Without Amplify you need to sign your request by implementing [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html).

# Architecture overview

![](https://github.com/tomoima525/sls-monorepo/blob/main/architecture.png)

# How to deploy this app?

You can create your own environment and host your website on AWS.

### Prerequisite

You need to create IAM role which has a permission to deploy AWS services like lamdba. Please checkout document on [serverless.com](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

### Deploy Backend

- Run the command below which sets up infrastructure required for the service like Role, Cognito, API Gateway and DynamoDB.

```
$ cd backend
$ yarn install
$ sls deploy
```

- Keep `endpoint`, `userPoolId`, `identityPoolId`, `userPoolWebClientId` somewhere, you need it for Frontend

- Run the command below which deploys services(application layer)

```
// Run from the root of the project
$ cd backend/services/notes
$ yarn install
$ sls deploy
```

### Deploy Frontend

- Run command below

```
$ cd frontend/web
$ yarn install
$ sls deploy // this will set up S3 bucket for static site
```

- Open the file below and update each information based on the output you got when you build `backend`

```js
frontend/web/src/config.js
onst env = "dev";
const region = "us-east-1";
const endpoint = `https://{your end point id}.execute-api.${region}.amazonaws.com/${env}`;
export default {
  APIConfig: {
    endpoints: [
      {
        name: `notes-${env}`,
        endpoint,
        region,
      },
    ],
  },
  cognito: {
    region,
    userPoolId: "us-east-1_{your pool id}",
    userPoolWebClientId: "{your user pool web client id}",
    identityPoolId: "{your identity pool id}",
  },
};
```

- Finally run the command below

```
$ yarn start
```

# Want to know more detail?

This project consist of `frontend` and `backend`.
Please refer to each README.md for the detail.
