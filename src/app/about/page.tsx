/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { collaboration, communication, innovation } from "../../../assets";
const page = () => {
  return (
    <div className="bg-[#F2F7F8] z-30 h-full relative w-full dark:bg-[#131826]">
      <div className="flex flex-col items-center z-30 relative justify-center">
        <h1 className="text-[#020817] dark:text-white font-outfit font-bold text-center text-3xl sm:text-4xl md:text-5xl lg:text-[68px] py-10 sm:py-[80px]">
          About Us
        </h1>
        <p className="text-[#84878E] dark:text-[#B3B7BF] font-outfit text-center text-base sm:text-lg md:text-xl lg:text-[24px] mt-4 sm:mt-[44px] max-w-[1000px] mb-10 sm:mb-[110px] px-4">
          We’re building the ultimate AI-powered document companion, a smart
          assistant that transforms how you read, understand, and interact with
          your PDFs. Whether you're studying, researching, or reviewing
          important files, our tool is here to make your workflow faster,
          clearer, and more efficient.
        </p>
      </div>
      <div className="w-full bg-[#E1E7EA] relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[552px] flex items-center justify-center overflow-hidden dark:bg-[#232734]">
        <motion.div
          initial={{ y: "50%" }}
          animate={{ y: "0%" }}
          whileHover={{ y: "-20%", color: "#2962EF" }}
          transition={{ type: "spring", stiffness: 120 }}
    className="font-outfit absolute inset-0 flex items-center justify-center text-[120px] sm:text-[180px] md:text-[260px] lg:text-[320px] cursor-default text-[#84878E]"
  >
    AIVSA
  </motion.div>
</div>
      <div className="mt-[150px]">
        <h1 className=" text-[#020817] dark:text-white font-bold font-outfit text-center text-3xl sm:text-4xl md:text-[40px] lg:text-[48px]">
          Our Values
        </h1>
        <p className="text-[#84878E] dark:text-[#B3B7BF]  font-outfit text-center text-base sm:text-lg md:text-xl lg:text-[24px] mt-[25px] px-4">
          Your AI powered reading companion, Your AI powered reading companion
        </p>
        <div className="flex items-center justify-center w-full container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 md:mt-[58px] gap-6 md:gap-[30px] ">
            <div className="">
              <div className="bg-[#EEF1F3] w-full max-w-sm mx-auto overflow-hidden aspect-square relative dark:bg-[#232734]">
                <motion.div
                  initial={{ y: "50%" }}
                  animate={{ y: "0%" }}
                  whileHover={{ y: "-70%", color: "#2962EF" }}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, 0)",
                  }}
                  className="-bottom-[69%] w-full h-full"
                >
                  <Image
                    alt="Innovation"
                    width={490}
                    src={innovation}
                    height={490}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <div className="bg-[#E1E7EA] dark:bg-[#080E1F] py-8 sm:py-[41px] px-6 sm:px-[58px]">
                <h1 className=" text-[#020817] dark:text-white font-bold font-outfit text-center text-2xl sm:text-3xl md:text-[32px] lg:text-[48px]">
                  Innovation
                </h1>
                <p className="text-[#84878E] dark:text-[#B3B7BF]  font-outfit text-center text-sm sm:text-base md:text-lg lg:text-[24px] mt-[20px]">
                  Your AI powered reading companion, Your AI powered reading
                  companion
                </p>
              </div>
            </div>{" "}
            <div className="">
              <div className="bg-[#EEF1F3] w-full max-w-sm mx-auto overflow-hidden aspect-square relative dark:bg-[#232734]">
                <motion.div
                  initial={{ y: "50%" }}
                  animate={{ y: "0%" }}
                  whileHover={{ y: "-60%", color: "#2962EF" }}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, 0)",
                  }}
                  className="-bottom-[69%] w-full h-full"
                >
                  <Image
                    alt="Innovation"
                    width={490}
                    src={collaboration}
                    height={490}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <div className="bg-[#E1E7EA] dark:bg-[#080E1F] py-8 sm:py-[41px] px-6 sm:px-[58px]">
                <h1 className=" text-[#020817] dark:text-white font-bold font-outfit text-center text-2xl sm:text-3xl md:text-[32px] lg:text-[48px]">
                  Collaboration
                </h1>
                <p className="text-[#84878E] dark:text-[#B3B7BF]  font-outfit text-center text-sm sm:text-base md:text-lg lg:text-[24px] mt-[20px]">
                  Your AI powered reading companion, Your AI powered reading
                  companion
                </p>
              </div>
            </div>{" "}
            <div className="">
              <div className="bg-[#EEF1F3] w-full max-w-sm mx-auto overflow-hidden aspect-square relative dark:bg-[#232734]">
                <motion.div
                  initial={{ y: "50%" }}
                  animate={{ y: "0%" }}
                  whileHover={{ y: "-70%", color: "#2962EF" }}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, 0)",
                  }}
                  className="-bottom-[69%] w-full h-full"
                >
                  <Image
                    alt="Innovation"
                    width={490}
                    src={communication}
                    height={490}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <div className="bg-[#E1E7EA] dark:bg-[#080E1F] py-8 sm:py-[41px] px-6 sm:px-[58px]">
                <h1 className=" text-[#020817] dark:text-white font-bold font-outfit text-center text-2xl sm:text-3xl md:text-[32px] lg:text-[48px]">
                  Communication
                </h1>
                <p className="text-[#84878E] dark:text-[#B3B7BF]  font-outfit text-center text-sm sm:text-base md:text-lg lg:text-[24px] mt-[20px]">
                  Your AI powered reading companion, Your AI powered reading
                  companion
                </p>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-8 lg:px-[114px] py-[40px] bg-white dark:bg-[#020817] mt-[101px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b-[2px] dark:border-b-[#19202F] border-b-[#EBEDF0] pb-5">
          <div>
            <Link href="/">
              <h1 className="font-quantico text-[26px]">AI VSA</h1>
            </Link>
            <p className="text-[#5F6F81] font-poppins mt-[15px]">
              Innovation and technology
            </p>
          </div>
          <div className="flex gap-6 sm:gap-[124px] text-[#1D2630] dark:text-white font-semibold text-[18px] font-poppins mt-4 sm:mt-0">
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        <div className="mt-[30px]">
          <p className="text-[#5F6F81] dark:text-[#B3B7BF] text-[14px] text-center sm:text-right font-poppins">
            © 2024 AI VSA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
