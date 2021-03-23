import Cookies from "js-cookie";

/**
 * Save session in browser cookie
 */
export const saveSession = (userId, userEmail, userToken) => {
  Cookies.set("serverless", { userId, userEmail, userToken });
};

/**
 * Get session in browser cookie
 */
export const getSession = () => {
  const data = Cookies.get("serverless");
  return data ? JSON.parse(data) : null;
};

/**
 * Delete session in browser cookie
 */
export const deleteSession = () => {
  Cookies.remove("serverless");
};

export const formatTime = (miliSec) => {
  const dtFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  });

  return dtFormat.format(new Date(miliSec));
};
