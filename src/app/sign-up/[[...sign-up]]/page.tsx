import { SignUp } from "@clerk/nextjs";
import RedirectAfterAuth from "@/components/RedirectAfterAuth";
import React from "react";

export default function Page() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <React.Suspense fallback={null}>
        <RedirectAfterAuth />
      </React.Suspense>
      <SignUp />
    </div>
  );
}
