# Backend

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `services` - containing code for each services. Service is a group of functions that are in the same domain
- `libs` - containing shared code base between your lambdas

```
.
├── backend
│   ├── services                # Services
│       └── notes/
│         └── serverless.yml    # Setting file for serverless framework (Lambda)
│         └── package.json      # Dependency specific for notes
│         └── functions/...     # functions
│   └── libs                    # Lambda shared code
│     └── api                   # Helper functions for api handling
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── lambda.ts           # Lambda middleware
├── package.json                # commonly used dependencies (e.g. aws-lamdba)
├── serverless.yml              # Set up for global usage (DB, API Gateway)
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
