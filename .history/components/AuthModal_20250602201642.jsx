// app/components/AuthModal.tsx
"use client";
import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function AuthModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const notLoggedIn = !window?.Clerk?.user;
    if (notLoggedIn) setShow(true);
  }, []);

  return show ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <SignIn path="/sign-" />
      </div>
    </div>
  ) : null;
}
