import { dynamodb } from "@libs/dynamoDB";
import { nanoid } from "nanoid";

/**
 * Get notes by owner
 * @param {string}
 */
const getNotesByOwner = async (owner: string): Promise<any> => {
  // Query
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NOTES,
    IndexName: "sortByTimestamp",
    KeyConditionExpression: "#owner = :hk",
    ExpressionAttributeValues: { ":hk": owner },
    ProjectionExpression: "#owner, id, content, #timestamp",
    ExpressionAttributeNames: { "#owner": "owner", "#timestamp": "timestamp" },
  };

  const notes = await dynamodb.query(params).promise();

  return notes.Items;
};

const register = async ({
  owner,
  content,
}: {
  owner: string;
  content: string;
}) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NOTES,
    Item: {
      owner,
      id: nanoid(),
      content,
      timestamp: Date.now(),
    },
  };
  await dynamodb.put(params).promise();
};

export default { getNotesByOwner, register };
