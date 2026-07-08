import { useMemo, useState } from "react";
import {
  Send,
  Sparkles,
  ClipboardList,
  Wrench,
  MapPin,
  AlertTriangle,
  User,
  Clock,
  Package,
  CheckCircle2,
  ListChecks,
  Save,
  BellRing,
  Pencil,
} from "lucide-react";
import { Breadcrumb } from "@/pages/Index";
import { useLanguage } from "@/hooks/useLanguage";

type Tab = "new" | "open" | "suggest";
type Msg = { role: "user" | "assistant"; text: string };

type Technician = {
  name: string;
  skill: string;
  load: string;
  distance: string;
  reasons: string[];
};

type WorkOrder = {
  type: string;
  title: string;
  asset: string;
  location: string;
  desc: string;
  priority: string;
  sla: string;
  skill: string;
  suggested: Technician[];
  assignee: string;
  reason: string;
  parts: string[];
  notes: string;
};

const EMPTY_WO: WorkOrder = {
  type: "",
  title: "",
  asset: "",
  location: "",
  desc: "",
  priority: "",
  sla: "",
  skill: "",
  suggested: [],
  assignee: "",
  reason: "",
  parts: [],
  notes: "",
};

// Demo technicians shown as recommendations
const TECH_TR: Technician[] = [
  {
    name: "Ahmet Yılmaz",
    skill: "Mekanik · Rotating equipment",
    load: "Orta",
    distance: "Gebze · Hat 2 · 5 dk",
    reasons: [
      "Son 60 günde 4 benzer pompa arızasını kapattı",
      "Kaplin hizalama tecrübesi var",
      "Lokasyona yakın",
      "İş yükü orta, bugün müsait",
    ],
  },
  {
    name: "Sinem Kara",
    skill: "Mekanik · Titreşim analizi",
    load: "Düşük",
    distance: "Gebze · Hat 3 · 12 dk",
    reasons: [
      "Titreşim analizi sertifikalı",
      "Bugün 2 açık iş",
      "Benzer pompa modelinde deneyimli",
    ],
  },
  {
    name: "Kerem Demir",
    skill: "Mekanik · Sahada",
    load: "Yüksek",
    distance: "Kocaeli · 45 dk",
    reasons: ["Uzmanlık uyuyor", "İş yükü yüksek, çakışma riski"],
  },
];

const TECH_EN: Technician[] = [
  {
    name: "Ahmet Yılmaz",
    skill: "Mechanical · Rotating equipment",
    load: "Medium",
    distance: "Gebze · Line 2 · 5 min",
    reasons: [
      "Closed 4 similar pump faults in the last 60 days",
      "Experienced with coupling alignment",
      "Close to the location",
      "Medium workload, available today",
    ],
  },
  {
    name: "Sinem Kara",
    skill: "Mechanical · Vibration analysis",
    load: "Low",
    distance: "Gebze · Line 3 · 12 min",
    reasons: [
      "Certified in vibration analysis",
      "2 open jobs today",
      "Experienced with similar pump model",
    ],
  },
  {
    name: "Kerem Demir",
    skill: "Mechanical · Field",
    load: "High",
    distance: "Kocaeli · 45 min",
    reasons: ["Skill matches", "High workload, conflict risk"],
  },
];

const DEMO_OPEN_TR = [
  { id: "WO-2041", title: "Pompa P-204 yüksek titreşim", asset: "P-204", assignee: "Ahmet Y.", priority: "Yüksek", status: "assigned", age: "2 sa" },
  { id: "WO-2039", title: "Konveyör rulman ısınması", asset: "CV-11", assignee: "Sinem K.", priority: "Yüksek", status: "enroute", age: "3 sa" },
  { id: "WO-2035", title: "Kompresör hava kaçağı", asset: "C-3", assignee: "—", priority: "Orta", status: "open", age: "5 sa" },
  { id: "WO-2028", title: "Pano alarm kontrolü", asset: "MP-01", assignee: "Kerem D.", priority: "Yüksek", status: "onsite", age: "6 sa" },
  { id: "WO-2020", title: "Filtre değişim planı", asset: "F-08", assignee: "Emre T.", priority: "Düşük", status: "waiting", age: "1 gün" },
];
const DEMO_OPEN_EN = [
  { id: "WO-2041", title: "Pump P-204 high vibration", asset: "P-204", assignee: "Ahmet Y.", priority: "High", status: "assigned", age: "2h" },
  { id: "WO-2039", title: "Conveyor bearing overheat", asset: "CV-11", assignee: "Sinem K.", priority: "High", status: "enroute", age: "3h" },
  { id: "WO-2035", title: "Compressor air leak", asset: "C-3", assignee: "—", priority: "Medium", status: "open", age: "5h" },
  { id: "WO-2028", title: "Panel alarm check", asset: "MP-01", assignee: "Kerem D.", priority: "High", status: "onsite", age: "6h" },
  { id: "WO-2020", title: "Filter change plan", asset: "F-08", assignee: "Emre T.", priority: "Low", status: "waiting", age: "1d" },
];

const STATUS_TONE: Record<string, string> = {
  open: "bg-amber-100 text-amber-800",
  assigned: "bg-primary/10 text-primary",
  enroute: "bg-blue-100 text-blue-800",
  onsite: "bg-emerald-100 text-emerald-800",
  waiting: "bg-muted text-muted-foreground",
  done: "bg-emerald-50 text-emerald-700",
};

export function WorkOrdersScreen() {
  const { t, lang } = useLanguage();
  const [tab, setTab] = useState<Tab>("new");

  return (
    <div className="space-y-10">
      <div>
        <Breadcrumb screen="work-orders" />
        <div className="mt-4">
          <h1 className="font-serif text-5xl text-foreground">{t("wo.title")}</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-3xl">{t("wo.subtitle")}</p>
        </div>
      </div>

      <div className="inline-flex border border-border rounded-md overflow-hidden text-sm bg-card">
        {(["new", "open", "suggest"] as Tab[]).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-2 transition-colors ${tab === k ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            {t(`wo.tab.${k}`)}
          </button>
        ))}
      </div>

      {tab === "new" && <NewWorkOrder />}
      {tab === "open" && <OpenWorkOrders rows={lang === "tr" ? DEMO_OPEN_TR : DEMO_OPEN_EN} />}
      {tab === "suggest" && <AssignmentInsights />}
    </div>
  );
}

/* -------------------- NEW WORK ORDER (chat + summary) -------------------- */

function NewWorkOrder() {
  const { t, lang } = useLanguage();
  const techs = lang === "tr" ? TECH_TR : TECH_EN;

  const quicks = lang === "tr"
    ? [
        "Pompa P-204 için arıza kaydı oluştur",
        "Yüksek ses ve titreşim var, öncelik yüksek",
        "Bugün atanması lazım, uygun teknisyeni öner",
      ]
    : [
        "Open a fault ticket for pump P-204",
        "High noise and vibration, priority high",
        "Assign today, suggest the best technician",
      ];

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: lang === "tr"
        ? "Merhaba. Yeni iş emrini birlikte oluşturalım. Ekipman kodu, lokasyon ve kısa arıza açıklamasıyla başlayabilirsiniz."
        : "Hi. Let's build the work order together. Start with equipment code, location and a short fault description.",
    },
  ]);
  const [input, setInput] = useState("");

  const [wo, setWo] = useState<WorkOrder>({
    ...EMPTY_WO,
    type: t("wo.type.fault"),
    title: lang === "tr" ? "Pompa P-204 yüksek titreşim" : "Pump P-204 high vibration",
    asset: "P-204",
    location: lang === "tr" ? "Gebze Fabrikası · Hat 2" : "Gebze Plant · Line 2",
    desc: lang === "tr"
      ? "Sahadan yüksek ses ve titreşim raporlandı. Kaplin hizalaması kontrol edilmeli."
      : "Field reports high noise and vibration. Coupling alignment should be checked.",
    priority: lang === "tr" ? "Yüksek" : "High",
    sla: lang === "tr" ? "8 saat" : "8 hours",
    skill: lang === "tr" ? "Mekanik · Rotating equipment" : "Mechanical · Rotating equipment",
    suggested: techs,
    assignee: "Ahmet Yılmaz",
    reason: lang === "tr"
      ? "Uzmanlık uyumlu, benzer pompa arızalarında deneyimli, lokasyona yakın, iş yükü orta."
      : "Skill match, experienced with similar pump faults, close to the site, medium workload.",
    parts: lang === "tr"
      ? ["Kaplin lastiği", "Titreşim ölçer", "Hizalama seti"]
      : ["Coupling insert", "Vibration meter", "Alignment kit"],
    notes: lang === "tr" ? "LOTO uygulanacak." : "LOTO to be applied.",
  });

  const send = (text: string) => {
    if (!text.trim()) return;
    const nextUser: Msg = { role: "user", text };
    const reply: Msg = {
      role: "assistant",
      text: lang === "tr"
        ? "Anladım. İş emri sağ panelde güncellendi. Ahmet Yılmaz öneriliyor — son 60 günde 4 benzer pompa arızasını kapattı, lokasyona yakın, iş yükü orta."
        : "Got it. The work order on the right is updated. Ahmet Yılmaz is recommended — closed 4 similar pump faults in the last 60 days, close to the site, medium workload.",
    };
    setMessages((m) => [...m, nextUser, reply]);
    setInput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Chat */}
      <section className="lg:col-span-3 rounded-lg border border-border bg-card p-6 flex flex-col min-h-[560px]">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">{t("wo.chat.title")}</h3>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <ChatBubble key={i} m={m} />
          ))}
        </div>

        <div className="mt-4">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">{t("wo.chat.quick")}</div>
          <div className="flex flex-wrap gap-2 mb-3">
            {quicks.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs px-2.5 py-1 rounded-full border border-border bg-background hover:bg-muted"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-end gap-2 rounded-md border border-border bg-background p-2"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder={t("wo.chat.placeholder")}
              className="flex-1 resize-none bg-transparent text-sm outline-none px-2 py-1"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
            >
              <Send className="h-3.5 w-3.5" /> {t("wo.chat.send")}
            </button>
          </form>
        </div>
      </section>

      {/* Summary */}
      <section className="lg:col-span-2 rounded-lg border border-border bg-card p-6 space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-copper" />
            <h3 className="text-sm font-medium text-foreground">{t("wo.summary.title")}</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{t("wo.summary.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Field icon={Wrench} label={t("wo.f.type")} value={wo.type} />
          <Field icon={AlertTriangle} label={t("wo.f.priority")} value={wo.priority} tone="primary" />
          <Field icon={ClipboardList} label={t("wo.f.title")} value={wo.title} full />
          <Field icon={Package} label={t("wo.f.asset")} value={wo.asset} />
          <Field icon={MapPin} label={t("wo.f.location")} value={wo.location} />
          <Field icon={ListChecks} label={t("wo.f.desc")} value={wo.desc} full />
          <Field icon={Clock} label={t("wo.f.sla")} value={wo.sla} />
          <Field icon={Sparkles} label={t("wo.f.skill")} value={wo.skill} />
        </div>

        {/* Recommended technicians */}
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">{t("wo.f.suggested")}</div>
          <div className="space-y-2">
            {wo.suggested.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} recommended={i === 0} />
            ))}
          </div>
        </div>

        <div className="rounded-md bg-primary/5 border border-primary/20 p-3 text-sm">
          <div className="flex items-center gap-2 text-primary font-medium">
            <User className="h-4 w-4" />
            {t("wo.f.assignee")}: {wo.assignee}
          </div>
          <p className="text-xs text-muted-foreground mt-1"><span className="text-foreground/70">{t("wo.f.reason")}:</span> {wo.reason}</p>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">{t("wo.f.parts")}</div>
          <div className="flex flex-wrap gap-1.5">
            {wo.parts.map((p) => (
              <span key={p} className="text-xs px-2 py-0.5 rounded border border-border bg-background">{p}</span>
            ))}
          </div>
        </div>

        {wo.notes && (
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">{t("wo.f.notes")}</div>
            <p className="text-sm text-foreground/90">{wo.notes}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
          <ActionBtn icon={Save} kind="ghost">{t("wo.act.saveDraft")}</ActionBtn>
          <ActionBtn icon={Pencil} kind="ghost">{t("wo.act.edit")}</ActionBtn>
          <ActionBtn icon={CheckCircle2} kind="primary">{t("wo.act.create")}</ActionBtn>
          <ActionBtn icon={BellRing} kind="copper">{t("wo.act.assign")}</ActionBtn>
        </div>
      </section>
    </div>
  );
}

function ChatBubble({ m }: { m: Msg }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm">
          {m.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="text-xs font-medium text-foreground">ToolA</div>
        <p className="text-sm text-foreground/90 mt-1 leading-relaxed">{m.text}</p>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  full,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  full?: boolean;
  tone?: "primary";
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className={`mt-1 text-sm ${tone === "primary" ? "text-primary font-medium" : "text-foreground"}`}>{value || "—"}</div>
    </div>
  );
}

function TechCard({ tech, recommended }: { tech: Technician; recommended?: boolean }) {
  return (
    <div className={`rounded-md border p-3 ${recommended ? "border-primary/40 bg-primary/5" : "border-border bg-background"}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-muted flex items-center justify-center text-xs font-medium text-foreground">
            {tech.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">{tech.name}</div>
            <div className="text-[11px] text-muted-foreground">{tech.skill}</div>
          </div>
        </div>
        {recommended && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary text-primary-foreground">★</span>
        )}
      </div>
      <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground list-disc list-inside">
        {tech.reasons.slice(0, 3).map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
        <span>{tech.load}</span>
        <span>·</span>
        <span>{tech.distance}</span>
      </div>
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  kind,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  kind: "primary" | "copper" | "ghost";
  children: React.ReactNode;
}) {
  const cls =
    kind === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary-hover"
      : kind === "copper"
      ? "bg-copper text-copper-foreground hover:bg-copper-hover"
      : "bg-background border border-border text-foreground hover:bg-muted";
  return (
    <button className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium ${cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}

/* -------------------- OPEN WORK ORDERS -------------------- */

function OpenWorkOrders({ rows }: { rows: typeof DEMO_OPEN_TR }) {
  const { t } = useLanguage();
  return (
    <section className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">{t("wo.open.title")}</h3>
        <span className="text-[11px] text-muted-foreground">{rows.length} · örnek</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-widest text-muted-foreground bg-muted/40">
              <th className="px-6 py-3">{t("wo.open.col.id")}</th>
              <th className="px-2 py-3">{t("wo.open.col.title")}</th>
              <th className="px-2 py-3">{t("wo.open.col.asset")}</th>
              <th className="px-2 py-3">{t("wo.open.col.assignee")}</th>
              <th className="px-2 py-3">{t("wo.open.col.priority")}</th>
              <th className="px-2 py-3">{t("wo.open.col.status")}</th>
              <th className="px-6 py-3">{t("wo.open.col.age")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-muted/40">
                <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                <td className="px-2 py-3 text-foreground">{r.title}</td>
                <td className="px-2 py-3 text-foreground/80">{r.asset}</td>
                <td className="px-2 py-3 text-foreground/80">{r.assignee}</td>
                <td className="px-2 py-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">{r.priority}</span>
                </td>
                <td className="px-2 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${STATUS_TONE[r.status] ?? "bg-muted text-muted-foreground"}`}>
                    {t(`wo.st.${r.status}`)}
                  </span>
                </td>
                <td className="px-6 py-3 text-xs text-muted-foreground">{r.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* -------------------- ASSIGNMENT INSIGHTS -------------------- */

function AssignmentInsights() {
  const { t, lang } = useLanguage();

  const groups = [
    {
      key: "reassign",
      icon: AlertTriangle,
      items: lang === "tr"
        ? ["WO-2028 · Kerem D. iş yükü yüksek — yeniden atama önerilir", "WO-2011 · Atanan teknisyen izinli"]
        : ["WO-2028 · Kerem D. overloaded — reassignment suggested", "WO-2011 · Assigned technician on leave"],
    },
    {
      key: "overdue",
      icon: Clock,
      items: lang === "tr"
        ? ["WO-1998 · SLA aşıldı (2 sa)", "WO-1985 · Beklemede 24 sa"]
        : ["WO-1998 · SLA breached (2h)", "WO-1985 · Waiting for 24h"],
    },
    {
      key: "busy",
      icon: User,
      items: lang === "tr"
        ? ["Kerem D. · 7 açık iş", "Emre T. · 5 açık iş"]
        : ["Kerem D. · 7 open jobs", "Emre T. · 5 open jobs"],
    },
    {
      key: "available",
      icon: CheckCircle2,
      items: lang === "tr"
        ? ["Sinem K. · 2 açık iş, bugün müsait", "Deniz A. · 1 açık iş, öğleden sonra müsait"]
        : ["Sinem K. · 2 open jobs, available today", "Deniz A. · 1 open job, available in the afternoon"],
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {groups.map((g) => {
        const Icon = g.icon;
        return (
          <section key={g.key} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="h-4 w-4 text-copper" />
              <h4 className="text-sm font-medium text-foreground">{t(`wo.sug.${g.key}`)}</h4>
            </div>
            <ul className="space-y-2 text-sm text-foreground/90">
              {g.items.map((i) => (
                <li key={i} className="rounded-md border border-border px-3 py-2 bg-background">{i}</li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
