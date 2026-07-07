CREATE OR REPLACE FUNCTION public.log_field_record_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;