// Resolves the public base URL for API / MCP endpoints shown to users.
// Prefers an explicit VITE_PUBLIC_API_BASE_URL (e.g. a reverse-proxied domain
// like https://api.saha.team). Falls back to the always-working Supabase
// functions endpoint so the copy-paste examples are never broken.
const configured = import.meta.env.VITE_PUBLIC_API_BASE_URL as string | undefined;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;

export const apiBaseUrl: string = (configured && configured.trim())
  ? configured.trim().replace(/\/+$/, "")
  : `${(supabaseUrl ?? "").replace(/\/+$/, "")}/functions/v1`;

export function apiUrl(path: string): string {
  const clean = path.replace(/^\/+/, "");
  return `${apiBaseUrl}/${clean}`;
}
