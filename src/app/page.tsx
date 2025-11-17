/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { Chat } from "@/components/chat";
import CourseSelector from "@/components/course-selector";
import { SignIn, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { useCourseContext } from "@/app/contexts/chosencourse-context";
import { useTheme } from "next-themes";
import Image from "next/image";
import { darkhero, lighthero } from "../../assets";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Home() {
  const { isCourseChosen, setIsCourseChosen } = useCourseContext();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [loadingExistingChat, setLoadingExistingChat] = React.useState(false);

  const handleGoToExistingChat = async () => {
    try {
      setLoadingExistingChat(true);
      const res = await axios.get("/api/my-chat");
      const { chat_id } = res.data as { chat_id?: number };
      if (chat_id) {
        router.push(`/chat/${chat_id}`);
      } else {
        toast.error("No existing chats found.");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const serverMessage = (err.response?.data as any)?.error;
        if (status === 401) {
          toast.error("Please sign in to access your chats.");
        } else if (status === 404) {
          toast.error("You don't have any chats yet.");
        } else if (typeof serverMessage === "string") {
          toast.error(serverMessage);
        } else {
          toast.error("Could not load your existing chat.");
        }
      } else {
        toast.error("Could not load your existing chat.");
      }
    } finally {
      setLoadingExistingChat(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#F2F7F8] dark:bg-[#131826]">
      <div className="flex py-4">
        <div className="w-full mx-auto ">
          <section className="container ">
            <div className="mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[68px] leading-tight text-[#020817] font-outfit dark:text-white font-bold mb-4 ">
                Turn any Boring PDFs <br /> into conversation.
              </h1>
              <div className="max-w-[563px] mt-4 lg:mt-0">
                <p className="text-[#84878E] dark:text-[#B3B7BF] font-poppins text-sm sm:text-base md:text-[16px] mb-4">
                  Transform your work and learning experience with our AI
                  Virtual Source Anaylzer! Upload PDFs and chat instantly.{" "}
                  <br />
                  Your smart assistant for seamless document interaction –
                  simplifying the way you work and study!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/selector">
                    <button className="text-white dark:bg-[#2962EF] bg-[#0B2D85] rounded-sm font-outfit font-semibold w-[268px] py-[22px] ">
                      Get Started
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={handleGoToExistingChat}
                    className="text-[#0B2D85] dark:text-[#2962EF] bg-white dark:bg-transparent border border-[#0B2D85] dark:border-[#2962EF] rounded-sm font-outfit font-semibold w-[268px] py-[22px]"
                    disabled={loadingExistingChat}
                  >
                    {loadingExistingChat
                      ? "Opening your chat..."
                      : "Continue existing chat"}
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-10 md:mt-[100px] px-4">
              {theme === "dark" ? (
                <div>
                  <Image
                    src={darkhero}
                    alt="lighthero"
                    width={1227}
                    height={710}
                    className="w-full h-auto max-w-[1227px]"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src={lighthero}
                    alt="darkhero"
                    width={1227}
                    height={710}
                    className="w-full h-auto max-w-[1227px]"
                  />
                </div>
              )}
            </div>
            <div className="mt-16 md:mt-[150px] w-full">
              <h3 className="text-[#020817] font-outfit font-bold text-center text-2xl sm:text-3xl md:text-[36px] dark:text-white ">
                Features
              </h3>
              <div className="mt-10 md:mt-[60px] flex flex-col lg:flex-row justify-between w-full gap-6 md:gap-[50px] items-stretch">
                <div className=" dark:bg-[#020817] p-6 sm:p-8 lg:p-[50px] rounded-md w-full max-w-[630px] bg-white">
                  <h1 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[48px] font-outfit font-bold dark:text-white ">
                    Seamless Document Integration
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[25px] font-poppins text-[#84878E] mt-2 dark:text-[#B3B7BF]">
                    Upload PDF study materials effortlessly and engage in
                    interactive chats with our AI assistant. Receive
                    personalized explanations and insights, optimizing your
                    learning process.
                  </p>
                </div>
                <div className=" dark:bg-[#020817] bg-white p-6 sm:p-8 lg:p-[50px] w-full max-w-[630px] rounded-md">
                  <h1 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[48px] font-outfit font-bold dark:text-white ">
                    Smart PDF Conversations
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[25px] font-poppins text-[#84878E] mt-2 dark:text-[#B3B7BF]">
                    Go beyond static reading. Chat directly with your PDFs ,ask
                    questions, extract key points, and understand documents
                    faster with an AI that adapts to your needs.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/*Footer*/}
      <div className="px-4 sm:px-8 lg:px-[114px] py-[40px] bg-white dark:bg-[#020817] mt-[101px]">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between border-b-[2px] dark:border-b-[#19202F] border-b-[#EBEDF0] pb-5">
          <div>
            <Link href="/">
              <h1 className="font-quantico text-[26px]">AI VSA</h1>
            </Link>
            <p className="text-[#5F6F81] font-poppins mt-[15px]">
              Innovation and technology
            </p>
          </div>
          <div className="flex gap-6 md:gap-[124px] text-[#1D2630] dark:text-white font-semibold text-[18px] font-poppins mt-4 md:mt-0">
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        <div className="mt-[30px]">
          <p className="text-[#5F6F81] dark:text-[#B3B7BF] text-[14px] text-center md:text-right font-poppins">
            © 2024 AI VSA. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
