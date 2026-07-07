import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Trash2, Pencil, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { computeQualityScore } from "@/lib/quality";
import { uploadEvidenceFiles, signedEvidenceUrl, classifyEvidence } from "@/lib/evidence";
import type { FieldRecord } from "@/hooks/useRecentFieldRecords";
import { useLanguage } from "@/hooks/useLanguage";

const STATUS_VALUES = ["open", "closed", "pending"] as const;
const SOURCE_VALUES = ["whatsapp", "form", "manual"] as const;

const schema = z.object({
  source: z.enum(SOURCE_VALUES),
  status: z.enum(STATUS_VALUES),
  raw_text: z.string().trim().min(1, "rec.rawRequired").max(5000),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  topic: z.string().trim().max(200).optional().or(z.literal("")),
  action_required: z.string().trim().max(500).optional().or(z.literal("")),
  root_cause: z.string().trim().max(500).optional().or(z.literal("")),
  resolution: z.string().trim().max(500).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  record: FieldRecord | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onUpdated: () => void;
}

export function FieldRecordDetailSheet({ record, open, onOpenChange, onUpdated }: Props) {
  const { t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [full, setFull] = useState<FieldRecord | null>(record);
  const [uploading, setUploading] = useState(false);
  const [evidenceItems, setEvidenceItems] = useState<{ path: string; url: string | null; kind: "image" | "pdf" | "document" }[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      source: "manual",
      status: "open",
      raw_text: "",
      location: "",
      topic: "",
      action_required: "",
      root_cause: "",
      resolution: "",
    },
  });

  // Reset state when record changes / sheet opens
  useEffect(() => {
    setFull(record);
    setEditing(false);
    if (record) {
      reset({
        source: (SOURCE_VALUES as readonly string[]).includes(record.source) ? (record.source as any) : "manual",
        status: (STATUS_VALUES as readonly string[]).includes(record.status) ? (record.status as any) : "open",
        raw_text: record.raw_text ?? "",
        location: record.location ?? "",
        topic: record.topic ?? "",
        action_required: record.action_required ?? "",
        root_cause: record.root_cause ?? "",
        resolution: record.resolution ?? "",
      });
    }
  }, [record, reset]);

  // Fetch full record when sheet opens
  useEffect(() => {
    let cancelled = false;
    if (open && record?.id) {
      supabase
        .from("field_records")
        .select("*")
        .eq("id", record.id)
        .maybeSingle()
        .then(({ data }) => {
          if (cancelled || !data) return;
          setFull(data as FieldRecord);
          reset({
            source: (SOURCE_VALUES as readonly string[]).includes((data as any).source) ? (data as any).source : "manual",
            status: (STATUS_VALUES as readonly string[]).includes((data as any).status) ? (data as any).status : "open",
            raw_text: (data as any).raw_text ?? "",
            location: (data as any).location ?? "",
            topic: (data as any).topic ?? "",
            action_required: (data as any).action_required ?? "",
            root_cause: (data as any).root_cause ?? "",
            resolution: (data as any).resolution ?? "",
          });
        });
    }
    return () => {
      cancelled = true;
    };
  }, [open, record?.id, reset]);

  const status = watch("status");
  const source = watch("source");

  // Resolve signed URLs + kinds for evidence paths whenever the record changes.
  useEffect(() => {
    let cancelled = false;
    const paths = (full?.evidence_urls ?? []).filter(Boolean) as string[];
    if (paths.length === 0) {
      setEvidenceItems([]);
      return;
    }
    (async () => {
      const items = await Promise.all(
        paths.map(async (p) => ({
          path: p,
          url: await signedEvidenceUrl(p),
          kind: classifyEvidence(p),
        })),
      );
      if (!cancelled) setEvidenceItems(items);
    })();
    return () => {
      cancelled = true;
    };
  }, [full?.id, full?.evidence_urls]);

  if (!record) return null;

  const r = full ?? record;

  const onSave = async (values: FormValues) => {
    if (!record) return;
    setSaving(true);
    try {
      const payload = {
        source: values.source,
        status: values.status,
        raw_text: values.raw_text,
        location: values.location || null,
        topic: values.topic || null,
        action_required: values.action_required || null,
        root_cause: values.root_cause || null,
        resolution: values.resolution || null,
        closed_at:
          values.status === "closed"
            ? r.closed_at ?? new Date().toISOString()
            : null,
      };
      const quality_score = computeQualityScore({
        ...payload,
        asset_id: r.asset_id ?? null,
        evidence_urls: r.evidence_urls ?? [],
      });
      const { error } = await supabase
        .from("field_records")
        .update({ ...payload, quality_score })
        .eq("id", record.id);
      if (error) throw error;
      supabase.functions.invoke("embed-record", { body: { record_id: record.id } }).catch(() => {})
      toast.success(t("detail.updated"));
      onUpdated();
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e?.message ?? t("detail.updateFailed"));
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!record) return;
    setDeleting(true);
    try {
      const { error } = await supabase.from("field_records").delete().eq("id", record.id);
      if (error) throw error;
      toast.success(t("detail.deleted"));
      setConfirmDelete(false);
      onUpdated();
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e?.message ?? t("detail.deleteFailed"));
    } finally {
      setDeleting(false);
    }
  };

  const fmtDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleString() : "—");

  const onUploadEvidence = async (fileList: FileList | null) => {
    if (!record || !fileList || fileList.length === 0) return;
    if (!(r as any).org_id) {
      toast.error(t("detail.updateFailed"));
      return;
    }
    setUploading(true);
    try {
      const uploaded = await uploadEvidenceFiles((r as any).org_id as string, record.id, Array.from(fileList));
      const newPaths = uploaded.map((u) => u.storage_path);
      const merged = Array.from(new Set([...(r.evidence_urls ?? []), ...newPaths]));
      const { error } = await supabase
        .from("field_records")
        .update({ evidence_urls: merged })
        .eq("id", record.id);
      if (error) throw error;
      setFull((prev) => (prev ? { ...prev, evidence_urls: merged } : prev));
      supabase.functions.invoke("embed-record", { body: { record_id: record.id } }).catch(() => {});
      toast.success(t("detail.updated"));
      onUpdated();
    } catch (e: any) {
      toast.error(e?.message ?? t("detail.updateFailed"));
    } finally {
      setUploading(false);
    }
  };


  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl">{t("detail.title")}</SheetTitle>
            <SheetDescription className="font-mono text-[11px] truncate">{r.id}</SheetDescription>
          </SheetHeader>

          <div className="mt-4 flex items-center gap-2">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
              >
                <Pencil className="h-3.5 w-3.5" /> {t("detail.edit")}
              </button>
            ) : (
              <button
                onClick={() => setEditing(false)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
              >
                <X className="h-3.5 w-3.5" /> {t("detail.cancel")}
              </button>
            )}
            <button
              onClick={() => setConfirmDelete(true)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-destructive/40 text-destructive px-3 py-1.5 text-xs hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" /> {t("detail.delete")}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSave)} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("rec.source")}>
                {editing ? (
                  <Select value={source} onValueChange={(v) => setValue("source", v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">{t("rec.srcWhatsapp")}</SelectItem>
                      <SelectItem value="form">{t("rec.srcForm")}</SelectItem>
                      <SelectItem value="manual">{t("rec.srcManual")}</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <ReadValue value={r.source} />
                )}
              </Field>
              <Field label={t("rec.status")}>
                <Select
                  value={status}
                  onValueChange={(v) => setValue("status", v as any)}
                  disabled={!editing}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">{t("status.open")}</SelectItem>
                    <SelectItem value="closed">{t("status.closed")}</SelectItem>
                    <SelectItem value="pending">{t("status.pending")}</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label={t("rec.topic")}>
              {editing ? <Input {...register("topic")} /> : <ReadValue value={r.topic} />}
            </Field>

            <Field label={t("rec.location")}>
              {editing ? <Input {...register("location")} /> : <ReadValue value={r.location} />}
            </Field>

            <Field label={t("detail.assetId")}>
              <ReadValue value={r.asset_id} mono />
            </Field>

            <Field label={t("rec.rawText")}>
              {editing ? (
                <>
                  <Textarea rows={4} {...register("raw_text")} />
                  {errors.raw_text && <p className="text-xs text-primary mt-1">{t(errors.raw_text.message ?? "")}</p>}
                </>
              ) : (
                <ReadValue value={r.raw_text} multiline />
              )}
            </Field>

            <Field label={t("rec.rootCause")}>
              {editing ? (
                <Textarea rows={2} maxLength={500} {...register("root_cause")} />
              ) : (
                <ReadValue value={r.root_cause} multiline />
              )}
            </Field>

            <Field label={t("rec.resolution")}>
              {editing ? (
                <Textarea rows={2} maxLength={500} {...register("resolution")} />
              ) : (
                <ReadValue value={r.resolution} multiline />
              )}
            </Field>

            <Field label={t("rec.action")}>
              {editing ? <Input {...register("action_required")} /> : <ReadValue value={r.action_required} />}
            </Field>

            <Field label={t("detail.evidence")}>
              {evidenceItems.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {evidenceItems.map((ev, i) => {
                    const name = ev.path.split("/").pop() ?? "evidence";
                    const href = ev.url ?? undefined;
                    return (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex w-24 flex-col items-center gap-1 rounded-md border border-border p-1.5 hover:bg-muted"
                        title={name}
                      >
                        {ev.kind === "image" && ev.url ? (
                          <img
                            src={ev.url}
                            alt={name}
                            className="h-16 w-full rounded object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-16 w-full items-center justify-center rounded bg-muted text-[10px] font-medium uppercase text-muted-foreground">
                            {ev.kind === "pdf" ? "PDF" : "DOC"}
                          </div>
                        )}
                        <span className="w-full truncate text-center text-[10px] text-muted-foreground">
                          {name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <ReadValue value={null} />
              )}
              <div className="mt-2">
                <Input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  disabled={uploading}
                  onChange={(e) => {
                    onUploadEvidence(e.target.files);
                    e.target.value = "";
                  }}
                />
                {uploading && (
                  <p className="mt-1 text-xs text-muted-foreground">{t("detail.uploading")}</p>
                )}
              </div>
            </Field>


            <div className="grid grid-cols-3 gap-3">
              <Field label={t("detail.quality")}>
                <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs">
                  {r.quality_score ?? "—"}
                </span>
              </Field>
              <Field label={t("detail.createdAt")}>
                <span className="text-xs text-muted-foreground">{fmtDate(r.created_at)}</span>
              </Field>
              <Field label={t("detail.closedAt")}>
                <span className="text-xs text-muted-foreground">{fmtDate(r.closed_at)}</span>
              </Field>
            </div>

            {editing && (
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted"
                >
                  {t("btn.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-60"
                >
                  {saving ? t("detail.saving") : t("detail.save")}
                </button>
              </div>
            )}
          </form>
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("detail.deleteConfirm")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("detail.deleteConfirmDesc")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("btn.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={deleting}>
              {deleting ? t("detail.deleting") : t("detail.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

function ReadValue({ value, multiline, mono }: { value?: string | null; multiline?: boolean; mono?: boolean }) {
  if (!value) return <span className="text-sm text-muted-foreground">—</span>;
  return (
    <div
      className={`text-sm text-foreground ${mono ? "font-mono text-xs break-all" : ""} ${
        multiline ? "whitespace-pre-wrap" : ""
      }`}
    >
      {value}
    </div>
  );
}
