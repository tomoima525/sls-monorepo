import DynamoDB from 'aws-sdk/clients/dynamodb';

export const dynamodb = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
})