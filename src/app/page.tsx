/* eslint-disable react/no-unescaped-entities */
"use client";
import { Chat } from "@/components/chat";
import CourseSelector from "@/components/course-selector";
import { SignIn, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { useCourseContext } from "@/app/contexts/chosencourse-context";
import { useTheme } from "next-themes";
import Image from "next/image";
import { darkhero, lighthero } from "../../assets";
export default function Home() {
  const { isCourseChosen, setIsCourseChosen } = useCourseContext();
  const { theme, setTheme } = useTheme();

  return (
    <main className="relative  flex min-h-screen w-full flex-col  bg-[#F2F7F8] dark:bg-[#131826]">
      <div className="flex  py-4">
        <div className="w-full mx-auto ">
          <section className="container ">
            <div className="  mx-auto flex justify-between items-center">
              <h1 className="md:text-[68px] text-4xl leading-normal text-[#020817] font-outfit dark:text-white font-bold mb-4 ">
                Welcome to the <br /> world of BU.BOT
              </h1>
              <div className="max-w-[563px]">
                <p className="text-[#84878E] dark:text-[#B3B7BF] font-poppins md:text-[16px] mb-4">
                  Revolutionize your study experience with our AI Virtual Study
                  Assistant! Upload PDFs, chat instantly, and explore predefined
                  courses. <br />
                  Your personalized learning companion awaits – where studying
                  meets simplicity!
                </p>
                <Link href="/selector">
                  <button className="text-white dark:bg-[#2962EF] bg-[#0B2D85] rounded-sm font-outfit font-semibold w-[268px] py-[22px] ">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-[100px]">
              {theme === "dark" ? (
                <div>
                  <Image
                    src={darkhero}
                    alt="lighthero"
                    width={1227}
                    height={710}
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src={lighthero}
                    alt="darkhero"
                    width={1227}
                    height={710}
                  />
                </div>
              )}
            </div>
            <div className="mt-[150px] w-full">
              <h3 className="text-[#020817] font-outfit font-bold text-center text-[36px] dark:text-white ">
                Features
              </h3>
              <div className="mt-[60px] flex justify-between w-full  gap-[50px] items-center">
                <div className=" dark:bg-[#020817] p-[50px] rounded-md max-w-[630px] h-[491px] bg-white">
                  <h1 className="text-[48px] font-outfit font-bold dark:text-white ">
                    Seamless Document Integration
                  </h1>
                  <p className="text-[25px] font-poppins text-[#84878E] mt-2 dark:text-[#B3B7BF]">
                    Upload PDF study materials effortlessly and engage in
                    interactive chats with our AI assistant. Receive
                    personalized explanations and insights, optimizing your
                    learning process.
                  </p>
                </div>
                <div className=" dark:bg-[#020817] bg-white p-[50px] max-w-[630px] h-[491px] rounded-md">
                  <h1 className="text-[48px] font-outfit font-bold dark:text-white ">
                    Tailored Course <br />
                    Selection
                  </h1>
                  <p className="text-[25px] font-poppins text-[#84878E] mt-2 dark:text-[#B3B7BF]">
                    Explore our handpicked courses covering a variety of
                    subjects. Whether it's Malware Analysis or Project
                    Management, our AI is primed to lead you through customized
                    learning paths for your educational voyage.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
{/*Footer*/}
            <div className="px-[114px] py-[40px] bg-white dark:bg-[#020817] mt-[101px]">
                <div className="flex justify-between border-b-[2px] dark:border-b-[#19202F] border-b-[#EBEDF0] pb-5">
                    <div>
                        <Link href='/'>
                            <h1 className='font-quantico text-[26px]'>AI VSA</h1>

                        </Link>
                        <p className="text-[#5F6F81] font-poppins mt-[15px]">Innovation and technology</p>
                    </div>
<div className="flex gap-[124px] text-[#1D2630] dark:text-white font-semibold text-[18px] font-poppins">
<Link href='/'>About</Link>
<Link href='/'>Contact</Link>
                    </div>
                </div>
                <div className="mt-[30px]">
<p className="text-[#5F6F81] dark:text-[#B3B7BF] text-[14px] text-right font-poppins">© 2024 AI VSA. All rights reserved.</p>
                </div>
</div>
    </main>
  );
}
