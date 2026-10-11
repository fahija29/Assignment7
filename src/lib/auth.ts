
import "server-only";

import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const database = new Database("./auth.db");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  secret: process.env.BETTER_AUTH_SECRET,

  database,

  emailAndPassword: {
    enabled: true,
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "email-password"],
      disableImplicitLinking: false,
    },
  },

  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {}),

    ...(githubClientId && githubClientSecret
      ? {
          github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
          },
        }
      : {}),

  },
});

