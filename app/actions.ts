"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signInWithKeycloak(formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "keycloak",
    options: {
      scopes: "openid",
      redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL + "/auth/callback",
    },
  });

  if (data.url) {
    return redirect(data.url);
  }
}

export async function signOut() {
  const keycloakLogoutUrl = `${process.env.SUPABASE_AUTH_EXTERNAL_KEYCLOAK_URL}/protocol/openid-connect/logout?post_logout_redirect_uri=${process.env.NEXT_PUBLIC_VERCEL_URL}/logout/callback&client_id=${process.env.SUPABASE_AUTH_EXTERNAL_KEYCLOAK_CLIENT_ID}`;
  return redirect(keycloakLogoutUrl);
}
