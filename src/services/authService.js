import { authClient } from "../http/authClient.js";

function forgotPassword({ email }) {
  return authClient.post("/v1/auth/password-reset", {
    email,
  });
}

function login({ email, password }) {
  return authClient.post("/v1/auth/login", { email, password });
}

function newPassword({ password, token, secret }) {
  return authClient.post("/v1/auth/password-set", {
    token,
    secret,
    password,
  });
}

export const authService = { forgotPassword, login, newPassword };
