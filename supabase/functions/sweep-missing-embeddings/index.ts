// Safety-net: finds field_records with a NULL embedding but non-empty raw_text
// (across all orgs) and embeds them in small batches. Triggered by pg_cron
// every few minutes so records never miss semantic search even if the original
// ingestion path forgot/failed to call embed-record.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function embedText(text: string): Promise<number[]> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "text-embedding-3-small", input: text }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI embeddings error: ${res.status} ${t}`);
  }
  const data = await res.json();
  return data.data[0].embedding as number[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const BATCH = 50;
    const { data: rows, error } = await admin
      .from("field_records")
      .select("id, topic, raw_text, location, root_cause, resolution")
      .is("embedding", null)
      .not("raw_text", "is", null)
      .order("created_at", { ascending: true })
      .limit(BATCH);
    if (error) return json({ error: error.message }, 500);

    if (!rows || rows.length === 0) {
      return json({ result: "ok", processed: 0 });
    }

    let processed = 0;
    let failed = 0;
    for (const r of rows) {
      const text = [r.topic, r.raw_text, r.location, r.root_cause, r.resolution]
        .filter(Boolean)
        .join("\n")
        .trim();
      if (!text) continue;
      try {
        const embedding = await embedText(text);
        const { error: upErr } = await admin
          .from("field_records")
          .update({ embedding: embedding as unknown as string })
          .eq("id", r.id);
        if (upErr) {
          failed++;
        } else {
          processed++;
        }
      } catch (_e) {
        failed++;
      }
    }

    return json({ result: "ok", processed, failed, batch: rows.length });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
