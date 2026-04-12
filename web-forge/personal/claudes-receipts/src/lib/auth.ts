import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {
  authAccounts,
  authAuthenticators,
  authSessions,
  authVerificationTokens,
  users,
} from "@/db/schema";
import { getDb } from "@/lib/db";
import { runtimeSetup } from "@/lib/setup";

const db = getDb();

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET ?? "replace-this-auth-secret",
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: db ? "database" : "jwt",
  },
  adapter: db
    ? DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: authAccounts,
        sessionsTable: authSessions,
        verificationTokensTable: authVerificationTokens,
        authenticatorsTable: authAuthenticators,
      })
    : undefined,
  providers: runtimeSetup.isGitHubAuthConfigured
    ? [
        GitHubProvider({
          clientId: process.env.AUTH_GITHUB_ID!,
          clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
      ]
    : [],
  callbacks: {
    async jwt({ token, profile, user }) {
      if (user?.id) {
        token.sub = user.id;
      }

      if (profile && "login" in profile && typeof profile.login === "string") {
        token.githubLogin = profile.login;
      }

      if (
        !token.githubLogin &&
        user &&
        "githubLogin" in user &&
        typeof user.githubLogin === "string"
      ) {
        token.githubLogin = user.githubLogin;
      }

      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user?.id ?? token.sub ?? "";
        session.user.githubLogin =
          ("githubLogin" in (user ?? {}) && typeof user?.githubLogin === "string"
            ? user.githubLogin
            : undefined) ??
          (typeof token.githubLogin === "string" ? token.githubLogin : undefined);
      }

      return session;
    },
    async signIn({ user, profile }) {
      if (
        db &&
        user.id &&
        profile &&
        "login" in profile &&
        typeof profile.login === "string"
      ) {
        await db
          .update(users)
          .set({
            githubLogin: profile.login,
            displayName: user.name ?? profile.login,
          })
          .where(eq(users.id, user.id));
      }

      return true;
    },
  },
};
