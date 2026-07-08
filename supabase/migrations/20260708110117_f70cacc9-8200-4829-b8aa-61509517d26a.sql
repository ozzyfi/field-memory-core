
-- Lock down SECURITY DEFINER functions: revoke broad EXECUTE, grant narrowly.
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_field_record_change() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.match_field_records(uuid, extensions.vector, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.match_field_records(uuid, uuid, extensions.vector, integer) FROM PUBLIC, anon, authenticated;

-- These are invoked by RLS policies evaluated as the calling role, so authenticated must keep EXECUTE.
-- Anon does not need access.
REVOKE ALL ON FUNCTION public.is_org_member(uuid, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_org_manager(uuid, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.org_has_members(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_org_member(uuid, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_org_manager(uuid, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.org_has_members(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.match_field_records(uuid, extensions.vector, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.match_field_records(uuid, uuid, extensions.vector, integer) TO service_role;

-- Replace overly permissive INSERT policy on organizations.
DROP POLICY IF EXISTS "Anyone can create an organization" ON public.organizations;
CREATE POLICY "Authenticated users can create an organization"
  ON public.organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
