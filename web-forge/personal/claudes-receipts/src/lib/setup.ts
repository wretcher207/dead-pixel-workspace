export const runtimeSetup = {
  isDatabaseConfigured: Boolean(process.env.DATABASE_URL),
  isGitHubAuthConfigured: Boolean(
    process.env.AUTH_GITHUB_ID &&
      process.env.AUTH_GITHUB_SECRET &&
      process.env.AUTH_SECRET,
  ),
} as const;

export function getSetupItems() {
  return [
    {
      label: "GitHub OAuth",
      value: runtimeSetup.isGitHubAuthConfigured ? "Configured" : "Missing env",
    },
    {
      label: "PostgreSQL",
      value: runtimeSetup.isDatabaseConfigured ? "Configured" : "Missing env",
    },
  ];
}
