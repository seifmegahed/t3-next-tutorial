"use client";

import {
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import SimpleUploadButton from "./simple-upload-button";
import Loading from "./Loading";

export default function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-3 text-xl font-semibold">
      <div>Gallery</div>
      <div className="flex flex-row gap-3">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-3">
            <SimpleUploadButton />
            <UserButton />
          </div>
        </SignedIn>
        <ClerkLoading>
          <Loading />
        </ClerkLoading>
      </div>
    </nav>
  );
}
