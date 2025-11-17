"use client";
import React from "react";

import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { useSession } from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const { isSignedIn } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <nav className="p-4 border-b bg-background/95 supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="flex items-center justify-between">
        <Link href="/">
          {" "}
          <span className="font-bold  font-quantico text-[26px]">AI VSA</span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          {" "}
          <Link
            href={"/about"}
            className="text-[#1D2630] dark:text-white font-semibold mr-2 lg:mr-[70px]"
          >
            About
          </Link>
          <Link
            href={"/contact"}
            className="text-[#1D2630] font-semibold dark:text-white mr-2 lg:mr-[100px]"
          >
            Contact us
          </Link>
          <div className="flex  gap-2 items-center">
            <ModeToggle /> {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <Link href="/sign-in"><button className="text-white dark:bg-[#2962EF] bg-[#0B2D85] rounded-sm font-outfit font-semibold  py-2 px-4 ">Login</button></Link>
}
          </div>
        </div>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-200 px-2 py-1 text-slate-700 dark:text-slate-100"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden mt-3 border-t border-slate-200 pt-3 space-y-3">
          <div className="flex flex-col gap-3">
            <Link
              href={"/about"}
              className="text-[#1D2630] dark:text-white font-semibold"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href={"/contact"}
              className="text-[#1D2630] font-semibold dark:text-white"
              onClick={() => setIsOpen(false)}
            >
              Contact us
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Theme
              </span>
              <ModeToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Account
              </span>
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                  <button className="text-white dark:bg-[#2962EF] bg-[#0B2D85] rounded-sm font-outfit font-semibold  py-2 px-4 ">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
