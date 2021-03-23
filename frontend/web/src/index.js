import React from "react";
import ReactDOM from "react-dom";
import Amplify, { API, Auth } from "aws-amplify";
import App from "./App";
import "./index.css";
import config from "./config";

const { APIConfig, cognito } = config;
// Setup Amplify
Amplify.configure({
  Auth: cognito,
  API: APIConfig,
});

API.configure();
Auth.configure();

/**
 * Render App
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
