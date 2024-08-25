"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export function SignInButton() {
  const { signIn } = useAuthActions();
  const [pending, setPending] = useState(false);

  const handleSignIn = () => {
    setPending(true);
    signIn("github")
      .catch((error) => {
        console.error("Sign in error:", error);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Button onClick={handleSignIn} disabled={pending}>
      {pending ? "Signing in..." : "Sign in with GitHub"}
    </Button>
  );
}
