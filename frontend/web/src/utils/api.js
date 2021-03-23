/**
 * Utils: Back-end
 */

import { API } from "aws-amplify";

/**
 * privateGet(API for testing purpose)
 */
export const privateGet = async () => {
  return await getApi("notes-dev", "/testPrivate", {}, null);
};

/**
 * API request to call the backend
 * apiName should match with endpoint.name in config
 */
export const getApi = async (apiName = "", path = "", params = {}) => {
  // Prepare URL
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  const requestParams = {
    queryStringParameters: params,
  };
  try {
    const response = await API.get(apiName, path, requestParams);
    return response;
  } catch (error) {
    console.log({ error });
  }
};

export const postApi = async (apiName = "", path = "", body = {}) => {
  // Prepare URL
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  const requestParams = {
    body,
  };
  try {
    const response = await API.post(apiName, path, requestParams);
    return response;
  } catch (error) {
    console.log({ error });
  }
};
