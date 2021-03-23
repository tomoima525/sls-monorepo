import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api/apiGateway";
import {
  formatJSONResponse,
  formatErrorJSONResponse,
  middyfy,
} from "@libs/api";
import notes from "@libs/models/notes";

import schema from "./schema";

const post: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const body = event.body;
    const { owner, content } = body;
    await notes.register({ owner, content });
    return formatJSONResponse({
      message: `Success!`,
    });
  } catch (e) {
    return formatErrorJSONResponse(400, {
      message: e.message,
    });
  }
};

export const postRequest = middyfy(post);
