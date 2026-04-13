"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

type AuthStatusProps = {
  authEnabled: boolean;
};

export function AuthStatus({ authEnabled }: AuthStatusProps) {
  const { data: session, status } = useSession();

  if (!authEnabled) {
    return (
      <Link className="auth-button auth-button-muted" href="/login">
        GitHub login setup
      </Link>
    );
  }

  if (status === "loading") {
    return <span className="auth-chip">Checking session</span>;
  }

  if (!session?.user) {
    return (
      <button
        className="auth-button"
        onClick={() => signIn("github")}
        type="button"
      >
        Sign in with GitHub
      </button>
    );
  }

  const label = session.user.githubLogin ?? session.user.name ?? "Signed in";

  return (
    <div className="auth-cluster">
      <span className="auth-chip">{label}</span>
      <button
        className="auth-button auth-button-muted"
        onClick={() => signOut({ callbackUrl: "/" })}
        type="button"
      >
        Sign out
      </button>
    </div>
  );
}
