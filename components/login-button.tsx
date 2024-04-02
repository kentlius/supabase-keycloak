"use client";

import { useFormStatus } from "react-dom";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Sign in with Keycloak
    </Button>
  );
}
