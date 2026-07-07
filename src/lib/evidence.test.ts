import { describe, it, expect } from "vitest";
import { classifyEvidence } from "@/lib/evidence";

describe("classifyEvidence", () => {
  it("detects images", () => {
    expect(classifyEvidence("photo.JPG")).toBe("image");
    expect(classifyEvidence("org/rec/shot.png?token=x")).toBe("image");
    expect(classifyEvidence("a.webp")).toBe("image");
  });
  it("detects pdf", () => {
    expect(classifyEvidence("report.pdf")).toBe("pdf");
  });
  it("falls back to document", () => {
    expect(classifyEvidence("notes.txt")).toBe("document");
    expect(classifyEvidence("file")).toBe("document");
  });
});

describe("apiBase", () => {
  it("falls back to supabase functions url when no override", async () => {
    const { apiUrl, apiBaseUrl } = await import("@/lib/apiBase");
    expect(apiBaseUrl).toContain("/functions/v1");
    expect(apiUrl("mcp")).toBe(`${apiBaseUrl}/mcp`);
    expect(apiUrl("/mcp")).toBe(`${apiBaseUrl}/mcp`);
  });
});
