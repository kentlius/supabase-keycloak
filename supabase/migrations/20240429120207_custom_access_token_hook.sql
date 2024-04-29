CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  claims jsonb;          -- Variable to store JWT claims.
  roles text;            -- Variable to store roles extracted from JWT.
BEGIN
  -- Decode the JWT specified in provider_access_token and extract roles.
  -- This uses the 'extensions.verify' function for decoding.
  SELECT
    (extensions.verify(
      token := provider_access_token,
      secret := '',
      algorithm := 'HS256'
    )).payload::jsonb->'realm_access'->'roles' INTO roles
  FROM auth.flow_state
  WHERE user_id = (event->>'user_id')::uuid
  ORDER BY updated_at DESC
  LIMIT 1;

  -- Retrieve existing claims from the event object.
  claims := event->'claims';

  -- Ensure 'user_metadata' exists in Supabase claims
  if jsonb_typeof(claims->'user_metadata') is null then
    -- If 'user_metadata' does not exist, create an empty object
    claims := jsonb_set(claims, '{user_metadata}', '{}');
  end if;

  -- Include the Keycloak roles in the Supabase JWT under 'user_metadata'
  claims := jsonb_set(claims, '{user_metadata, roles}', to_jsonb(roles::jsonb));

  -- Update the 'claims' object in the original event
  event := jsonb_set(event, '{claims}', claims);

  -- Return the modified event
  RETURN event;
END;
$$;

grant execute
  on function public.custom_access_token_hook
  to supabase_auth_admin;

revoke execute
  on function public.custom_access_token_hook
  from authenticated, anon;

grant usage on schema public to supabase_auth_admin;

grant execute
  on function extensions.verify
  to supabase_auth_admin;

grant usage on schema extensions to supabase_auth_admin;
