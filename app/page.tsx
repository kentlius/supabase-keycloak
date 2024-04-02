import { signInWithKeycloak, signOut } from "@/app/actions";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {user ? (
        <div className="text-center">
          <h1 className="text-2xl">
            logged in as <span className="font-bold">{user?.email}</span>
          </h1>
          <form action={signOut}>
            <Button variant={"destructive"}>Sign out</Button>
          </form>
        </div>
      ) : (
        <form action={signInWithKeycloak}>
          <Button>Sign in with Keycloak</Button>
        </form>
      )}
    </main>
  );
}
