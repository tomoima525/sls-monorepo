import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api/apiGateway";
import {
  formatJSONResponse,
  formatErrorJSONResponse,
  middyfy,
} from "@libs/api";

import notes from "@libs/models/notes";

import schema from "./schema";
const getList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const body = event.queryStringParameters;
    const { owner } = body;
    const list = await notes.getNotesByOwner(owner);
    return formatJSONResponse({
      message: `Success`,
      list,
    });
  } catch (e) {
    return formatErrorJSONResponse(400, {
      message: e.message,
    });
  }
};

export const getListRequest = middyfy(getList);
