"use client";
import React from "react";

import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { useSession } from "@clerk/nextjs";
import Link from "next/link";
const Navbar = () => {
  const { isSignedIn } = useSession();
  return (
    <div className=" p-4 flex h-14 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <Link href="/">
        {" "}
        <span className="font-bold  font-quantico text-[26px]">AI VSA</span>
      </Link>
      <div className="flex items-center ">
        {" "}
        <Link
          href={"/about"}
          className="text-[#1D2630] dark:text-white font-semibold mr-[70px]"
        >
          About
        </Link>
        <Link
          href={"/contact"}
          className="text-[#1D2630] font-semibold dark:text-white mr-[100px]"
        >
          Contact us
        </Link>
        <div className="flex  gap-2 items-center">
          <ModeToggle /> {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <Link href="/sign-in"><button className="text-white dark:bg-[#2962EF] bg-[#0B2D85] rounded-sm font-outfit font-semibold  py-2 px-4 ">Login</button></Link>
}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
