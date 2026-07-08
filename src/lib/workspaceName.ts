export function workspaceName(email?: string | null): string {
  // Fixed brand workspace name — ToolA is a single-tenant demo panel.
  void email;
  return "ToolA Workspace";
}

export function workspaceInitial(email?: string | null): string {
  void email;
  return "T";
}
