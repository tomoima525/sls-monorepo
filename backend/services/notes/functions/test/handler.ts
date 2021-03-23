import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api/apiGateway";
import {
  formatJSONResponse,
  formatErrorJSONResponse,
  middyfy,
} from "@libs/api";

const publicAPI: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  try {
    return formatJSONResponse({
      message: `This is public API!`,
    });
  } catch (e) {
    return formatErrorJSONResponse(400, {
      message: e.message,
    });
  }
};

const privateAPI: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  try {
    return formatJSONResponse({
      message: `This is private API!`,
    });
  } catch (e) {
    return formatErrorJSONResponse(400, {
      message: e.message,
    });
  }
};

export const publicRequest = middyfy(publicAPI);
export const privateRequest = middyfy(privateAPI);
