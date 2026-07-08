// Synthetic retail demo data + answer generation for the AI Chat screen.
// Used as a fallback when no real records exist or the AI service is unavailable.
// Everything produced here is clearly labelled as "Demo data" in the UI.

export type WorkflowId = "general" | "quality" | "compliance" | "audit" | "storefile";

export const DEMO_LOCATIONS = [
  "Gebze Fabrikası",
  "İzmir Tesisi",
  "Bursa Fabrikası",
  "Kocaeli Tesisi",
  "Ankara Tesisi",
];

export const DEMO_TOPICS = [
  "Pompa titreşim ve arıza kayıtları",
  "Rulman aşırı ısınma",
  "Kompresör hava kaçağı",
  "Kaplin hizalama işleri",
  "Elektrik pano alarmı",
  "Yedek parça değişim geçmişi",
  "Önleyici bakım gecikmeleri",
  "Vardiya devir notları",
  "Eksik fotoğraf/kanıtla kapatılan iş emirleri",
  "Aynı arızanın tekrar tekrar oluşması",
  "Teknisyen eğitim ihtiyacı",
];

export const DEMO_SOURCES = [
  "Saha Bildirim Mesajları",
  "CMMS İş Emri Kayıtları",
  "Bakım Denetim Formları",
  "Mobil Kanıt / Ölçüm Akışı",
];

export type DemoRecord = { id: string; topic: string; location: string };

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pickRecords(seed: number, topics: string[], count: number): DemoRecord[] {
  const out: DemoRecord[] = [];
  for (let i = 0; i < count; i++) {
    const topic = topics[(seed + i) % topics.length];
    const location = DEMO_LOCATIONS[(seed + i * 3) % DEMO_LOCATIONS.length];
    const id = `REC-${10200 + ((seed + i * 7) % 700)}`;
    out.push({ id, topic, location });
  }
  return out;
}

export type DemoAnswer = {
  markdown: string;
  records: DemoRecord[];
  meta: { recordsAnalysed: number; locations: number; range: string; sources: string[] };
};

// Build a query- and workflow-aware demo answer. Different questions and
// workflows produce different framing, findings and recommended actions.
export function buildDemoAnswer(query: string, workflow: WorkflowId, range: string): DemoAnswer {
  const q = query.toLowerCase();
  const seed = hash(query + workflow);

  // Topic focus from query keywords
  let focusTopics = DEMO_TOPICS;
  let theme = "operational records";
  if (/(pompa|pump|titreşim|vibration)/.test(q)) {
    focusTopics = ["Pompa titreşim ve arıza kayıtları", "Kaplin hizalama işleri", "Yedek parça değişim geçmişi"];
    theme = "pump-related faults";
  } else if (/(rulman|bearing|ısınma|overheat)/.test(q)) {
    focusTopics = ["Rulman aşırı ısınma", "Önleyici bakım gecikmeleri", "Yedek parça değişim geçmişi"];
    theme = "bearing overheat events";
  } else if (/(kaçak|leak|kompresör|compressor|hava)/.test(q)) {
    focusTopics = ["Kompresör hava kaçağı", "Önleyici bakım gecikmeleri"];
    theme = "compressor / air leak issues";
  } else if (/(photo|foto|kanıt|evidence|ölçüm)/.test(q)) {
    focusTopics = ["Eksik fotoğraf/kanıtla kapatılan iş emirleri"];
    theme = "work orders closed without evidence";
  } else if (/(eğitim|training|prosedür|procedure|teknisyen)/.test(q)) {
    focusTopics = ["Aynı arızanın tekrar tekrar oluşması", "Teknisyen eğitim ihtiyacı"];
    theme = "technician training needs";
  } else if (/(risk|özet|summar)/.test(q)) {
    focusTopics = DEMO_TOPICS;
    theme = "this period's maintenance risks";
  }

  const records = pickRecords(seed, focusTopics, 4);
  const recordsAnalysed = 80 + (seed % 120);
  const topStore = DEMO_LOCATIONS[seed % DEMO_LOCATIONS.length];
  const secondStore = DEMO_LOCATIONS[(seed + 2) % DEMO_LOCATIONS.length];
  const sources = DEMO_SOURCES.slice(0, 2 + (seed % 3));

  let summary = "";
  let findings: string[] = [];
  let actions: string[] = [];

  switch (workflow) {
    case "quality":
      summary = `Quality review of ${theme} shows that ${topStore} has the highest share of incomplete or low-quality records, mainly due to missing evidence and unclear closure notes.`;
      findings = [
        `${12 + (seed % 9)} records are missing mandatory fields (root cause / evidence).`,
        `${topStore} has the lowest average closure quality score (${58 + (seed % 12)}%).`,
        `${4 + (seed % 5)} cases were closed without any photo or document.`,
      ];
      actions = [
        "Require evidence before a record can be closed.",
        `Run a closure-quality coaching session at ${topStore}.`,
        "Re-open the records that lack mandatory fields.",
      ];
      break;
    case "compliance":
      summary = `Compliance check of ${theme} indicates most closures follow procedure, but a cluster at ${topStore} and ${secondStore} is missing mandatory evidence or approvals.`;
      findings = [
        `${5 + (seed % 6)} closures do not meet the mandatory photo-evidence rule.`,
        `${2 + (seed % 4)} high-impact cases are missing supervisor sign-off.`,
        "Refund/return SOP steps were skipped on a small number of records.",
      ];
      actions = [
        "Flag non-compliant closures for review.",
        "Request supervisor sign-off on the affected cases.",
        "Notify the compliance lead of the gap.",
      ];
      break;
    case "audit":
      summary = `Audit trail for ${theme}: changes are attributable to specific users and timestamps. Several closed records were edited shortly after closing.`;
      findings = [
        `${4 + (seed % 5)} closed records were edited within 48h of closing.`,
        `${1 + (seed % 3)} records were reopened after being marked closed.`,
        "All edits have an identified user and timestamp.",
      ];
      actions = [
        "Review post-close edits with store managers.",
        "Confirm reopen reasons are documented.",
        "Export the change log for the auditor.",
      ];
      break;
    case "storefile":
      summary = `Store file analysis of ${theme}: across the active store lifecycle files (openings, closures, renovations and relocations), ${topStore} has the most decisions still pending, mainly around equipment reuse and location photos.`;
      findings = [
        `${6 + (seed % 8)} pieces of equipment are marked for transfer to another store or warehouse.`,
        `${2 + (seed % 4)} items are awaiting technical inspection before a decision.`,
        `Location/frontage photos for the new store candidate still need review for opening potential.`,
      ];
      actions = [
        "Confirm transfer and warehouse decisions for reusable equipment.",
        "Schedule technical inspection for flagged items before sale or scrap.",
        "Review street view and frontage photos to assess opening potential.",
      ];
      break;
    default: // general
      summary = `Looking across ${theme}, ${topStore} and ${secondStore} generate the most activity, with returns and price mismatches as the dominant recurring issues.`;
      findings = [
        `${topStore} receives the most ${theme}.`,
        `Price mismatches between campaign and POS appear in ${8 + (seed % 10)} records.`,
        `${3 + (seed % 4)} stores report the same recurring issue this period.`,
      ];
      actions = [
        `Prioritise a review of ${topStore}.`,
        "Align campaign pricing with POS configuration.",
        "Share a short fix guide with all stores.",
      ];
  }

  const recordLines = records
    .map((r) => `- \`${r.id}\` — ${r.topic} · ${r.location}`)
    .join("\n");

  const markdown = [
    `### Executive summary`,
    summary,
    ``,
    `### Key findings`,
    findings.map((f) => `- ${f}`).join("\n"),
    ``,
    `### Relevant records`,
    recordLines,
    ``,
    `### Recommended actions`,
    actions.map((a, i) => `${i + 1}. ${a}`).join("\n"),
    ``,
    `### Sources`,
    sources.map((s) => `- ${s}`).join("\n"),
  ].join("\n");

  return {
    markdown,
    records,
    meta: { recordsAnalysed, locations: 5, range, sources },
  };
}

// Controlled chunk streamer that mimics a real AI token stream.
export async function streamText(
  text: string,
  onChunk: (chunk: string) => void,
  signal: AbortSignal,
  chunkSize = 4,
  delayMs = 18,
): Promise<void> {
  const words = text.split(/(\s+)/);
  let buf = "";
  let count = 0;
  for (const w of words) {
    if (signal.aborted) return;
    buf += w;
    count++;
    if (count >= chunkSize) {
      onChunk(buf);
      buf = "";
      count = 0;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  if (buf && !signal.aborted) onChunk(buf);
}
