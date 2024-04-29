CREATE OR REPLACE FUNCTION public.has_specific_role(claims jsonb, role_name text)
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the 'roles' key exists within the 'user_metadata' JSONB and if it contains the specified 'role_name'
    RETURN EXISTS (
        SELECT 1
        FROM jsonb_array_elements_text(claims->'user_metadata'->'roles') AS role
        WHERE role = role_name
    );
END;
$$;
