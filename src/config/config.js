import "dotenv/config";

export const PORT = process.env.PORT;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_URL_CALLBACK = process.env.GITHUB_URL_CALLBACK;
export const URL_MONGO = process.env.URL_MONGO;
export const JWT_SECRET = process.env.JWT_SECRET;
export const emailAdmin = process.env.emailAdmin;
export const COOKIE_OPTS = {
  signed: true,
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: true,
};
export const COOKIE_KEY = process.env.COOKIE_KEY;
