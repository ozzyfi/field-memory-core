
-- Part 1: server-side quality_score
CREATE OR REPLACE FUNCTION public.compute_field_record_quality()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  score integer := 100;
BEGIN
  IF NEW.root_cause IS NULL OR btrim(NEW.root_cause) = '' THEN
    score := score - 25;
  END IF;
  IF NEW.evidence_urls IS NULL OR array_length(NEW.evidence_urls, 1) IS NULL THEN
    score := score - 25;
  END IF;
  IF NEW.asset_id IS NULL THEN
    score := score - 25;
  END IF;
  IF NEW.resolution IS NULL OR btrim(NEW.resolution) = '' THEN
    score := score - 25;
  END IF;
  IF score < 0 THEN
    score := 0;
  END IF;
  NEW.quality_score := score;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_field_records_quality ON public.field_records;
CREATE TRIGGER trg_field_records_quality
BEFORE INSERT OR UPDATE ON public.field_records
FOR EACH ROW EXECUTE FUNCTION public.compute_field_record_quality();

-- Part 5: change history table
CREATE TABLE public.field_record_changes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  field_record_id uuid NOT NULL REFERENCES public.field_records(id) ON DELETE CASCADE,
  changed_by uuid,
  changed_at timestamptz NOT NULL DEFAULT now(),
  old_status text,
  new_status text,
  changed_fields jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_field_record_changes_org ON public.field_record_changes(org_id);
CREATE INDEX idx_field_record_changes_record ON public.field_record_changes(field_record_id);
CREATE INDEX idx_field_record_changes_changed_at ON public.field_record_changes(changed_at DESC);

GRANT SELECT ON public.field_record_changes TO authenticated;
GRANT ALL ON public.field_record_changes TO service_role;

ALTER TABLE public.field_record_changes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view change history"
ON public.field_record_changes
FOR SELECT
TO authenticated
USING (public.is_org_member(auth.uid(), org_id));

-- AFTER UPDATE trigger to record changes
CREATE OR REPLACE FUNCTION public.log_field_record_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  changed jsonb := '{}'::jsonb;
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    changed := changed || jsonb_build_object('status', jsonb_build_object('old', OLD.status, 'new', NEW.status));
  END IF;
  IF NEW.root_cause IS DISTINCT FROM OLD.root_cause THEN
    changed := changed || jsonb_build_object('root_cause', jsonb_build_object('old', OLD.root_cause, 'new', NEW.root_cause));
  END IF;
  IF NEW.resolution IS DISTINCT FROM OLD.resolution THEN
    changed := changed || jsonb_build_object('resolution', jsonb_build_object('old', OLD.resolution, 'new', NEW.resolution));
  END IF;
  IF NEW.closed_at IS DISTINCT FROM OLD.closed_at THEN
    changed := changed || jsonb_build_object('closed_at', jsonb_build_object('old', OLD.closed_at, 'new', NEW.closed_at));
  END IF;

  IF changed <> '{}'::jsonb THEN
    INSERT INTO public.field_record_changes(org_id, field_record_id, changed_by, old_status, new_status, changed_fields)
    VALUES (NEW.org_id, NEW.id, auth.uid(), OLD.status, NEW.status, changed);
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_field_records_change_log ON public.field_records;
CREATE TRIGGER trg_field_records_change_log
AFTER UPDATE ON public.field_records
FOR EACH ROW EXECUTE FUNCTION public.log_field_record_change();

-- Part 2: enable extensions for scheduled embedding sweep
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
