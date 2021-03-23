/**
 * Global Config
 */

// Todo: setup domains based on environment
const env = "dev";
const region = "us-east-1";
const endpoint = `https://6cwo00qz76.execute-api.${region}.amazonaws.com/${env}`;
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
    userPoolId: "us-east-1_XXXXXXXX",
    userPoolWebClientId: "xxxxx",
    identityPoolId: "us-east-1:xxxxxxxxxx",
  },
};
