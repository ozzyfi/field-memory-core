import { supabase } from "@/lib/supabase";

export type EvidenceKind = "image" | "pdf" | "document";

export function classifyEvidence(nameOrUrl: string): EvidenceKind {
  const lower = (nameOrUrl || "").toLowerCase().split("?")[0];
  if (/\.(png|jpe?g|gif|webp|bmp|heic)$/.test(lower)) return "image";
  if (/\.pdf$/.test(lower)) return "pdf";
  return "document";
}

export interface UploadedEvidence {
  storage_path: string;
  file_name: string;
  mime_type: string;
}

/**
 * Uploads files to the private `evidence` bucket at
 * `${orgId}/${recordId}/${fileName}`, inserts canonical rows into
 * `record_evidence`, and returns the storage paths (also mirrored into
 * field_records.evidence_urls by the caller for backward compatibility).
 */
export async function uploadEvidenceFiles(
  orgId: string,
  recordId: string,
  files: File[],
): Promise<UploadedEvidence[]> {
  const uploaded: UploadedEvidence[] = [];
  for (const file of files) {
    const safeName = file.name.replace(/[^\w.\-]+/g, "_");
    const storage_path = `${orgId}/${recordId}/${Date.now()}_${safeName}`;
    const { error: upErr } = await supabase.storage
      .from("evidence")
      .upload(storage_path, file, { contentType: file.type || undefined, upsert: false });
    if (upErr) throw upErr;

    const mime_type = file.type || "application/octet-stream";
    const { error: insErr } = await supabase.from("record_evidence").insert({
      org_id: orgId,
      field_record_id: recordId,
      storage_path,
      file_name: file.name,
      mime_type,
    });
    if (insErr) throw insErr;

    uploaded.push({ storage_path, file_name: file.name, mime_type });
  }
  return uploaded;
}

/** Create a short-lived signed URL for a private evidence storage path. */
export async function signedEvidenceUrl(storagePath: string): Promise<string | null> {
  if (/^https?:\/\//.test(storagePath)) return storagePath;
  const { data } = await supabase.storage
    .from("evidence")
    .createSignedUrl(storagePath, 60 * 30);
  return data?.signedUrl ?? null;
}
