# Notes

Service for notes

## Installation/deployment instructions

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

### Locally

**Running function only works with public APIs**
In order to test the function locally, run the following command:

- `yarn sls invoke local -f hello --path src/functions/test/mock.json` if you're using Yarn

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Test Private API

Private API can not be tested without authorization. Use `Postman` to request API using `AWS Signature`. You can find reference [here](https://aws.amazon.com/premiumsupport/knowledge-center/iam-authentication-api-gateway/).
There are few gotchas:

- `AccessKey` `SecretKey` can be fetched by `aws-amplify`. Use `Auth.currentCredentials`
- You also need to set `sessionToken` to request

```
// response of currentCredentials
accessKeyId: "ASIAY45AH2ZESC7Q5FME", // AccessKey
authenticated: true, // Make sure you use authorized user
secretAccessKey: "fUsJ35XEJhmQIl0anu9T2Qbl03pRSyuypsC0UjQ9" // SecretKey
sessionToken: "IQo ......" // You need to set this
```

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│       ├── getList
│       │   ├── handler.ts      # lambda source code
│       │   ├── index.ts        # lambda Serverless configuration
│       │   ├── schema.json     # lambda input parameter, if any, for local invocation
│       │   └── schema.ts       # lambda input event JSON-Schema
│       │
│       └── index.ts            # Import/export of all lambda configurations
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
└── webpack.config.js           # Webpack configuration
```
