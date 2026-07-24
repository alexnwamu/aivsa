"use client";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import React from "react";

// Clerk finishes sign-in/sign-up with a soft router.push, which can be served
// from Next's client router cache. If the target route was prefetched while
// signed out it cached a middleware redirect, not the page, and the user lands
// on a blank screen until they refresh. Doing a full document load instead
// skips the router cache entirely.
const RedirectAfterAuth = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const target = searchParams.get("redirect_url") || "/";
    // only allow same-origin targets
    const url = new URL(target, window.location.origin);
    window.location.replace(
      url.origin === window.location.origin ? url.href : "/"
    );
  }, [isLoaded, isSignedIn, searchParams]);

  return null;
};

export default RedirectAfterAuth;
