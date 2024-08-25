"use client";

import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/UserMenu";
import { ReactNode } from "react";
import { SignInButton } from "@/components/SignInButton";

export default function PageLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <>
      <header className="bg-primary text-primary-foreground">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            My Learning Journey
          </Link>
          <div>
            <Link href="/posts/new" passHref>
              <Button variant="secondary" className="mr-2">
                New Post
              </Button>
            </Link>
            {isAuthenticated && <UserMenu>{children}</UserMenu>}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="bg-muted mt-8">
        <div className="container mx-auto px-4 py-4 text-center">
          © {new Date().getFullYear()} My Learning Journey
        </div>
      </footer>
    </>
  );
}
