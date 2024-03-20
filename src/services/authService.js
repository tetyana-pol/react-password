import { authClient } from "../http/authClient.js";

function forgotPassword({ email }) {
  return authClient.post("/v1/auth/password-reset", {
    email,
    redirect_url: "https://react-app-password.netlify.app/create-password",
  });
}

function login({ email, password }) {
  return authClient.post("/v1/auth/login", { email, password });
}

function newPassword({ password, token, secret }) {
  return authClient.post("/password-set", {
    token,
    secret,
    password,
  });
}

export const authService = { forgotPassword, login, newPassword };
