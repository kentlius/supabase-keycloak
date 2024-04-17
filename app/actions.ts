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
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
}
