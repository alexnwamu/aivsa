"use client";
import { Chat } from "@/components/chat";
import CourseSelector from "@/components/course-selector";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import { SignIn, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { useSession } from "@clerk/nextjs";
import { useCourseContext } from "@/app/contexts/chosencourse-context";
export default function Home() {
  const { isLoaded, session, isSignedIn } = useSession();
  const { isCourseChosen, setIsCourseChosen } = useCourseContext();

  return (
    <main className="relative container flex min-h-screen flex-col">
      <div className="flex flex-1 py-4">
        <div className="w-full">
          {isSignedIn ? (
            <div>{isCourseChosen ? <Chat /> : <CourseSelector />}</div>
          ) : (
            <div>
              <div className="text-center mt-24 ">
                <h1 className="md:text-8xl text-4xl font-semibold mb-4 ">
                  Welcome to BUBOT
                </h1>
                <p className="bg-gray-700 text-white italic  inline p-2 rounded-xl ">
                  Your AI Virtual Study Assistant
                </p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link href="/sign-in">
                  <Button>Login to get started </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
