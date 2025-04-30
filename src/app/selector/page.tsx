import CourseSelector from "@/components/course-selector";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container py-[100px] flex items-center h-screen bg-white dark:bg-[#020817] justify-center">
      {/* <CourseSelector /> */}
      {/* <div className="bg-[#F1F3F5] dark:bg-[#101726] h-full w-[2px]  rounded-lg"></div>{" "} */}
      <div className="text-center">
        <h2 className="font-semibold font-outfit text-[33px] ">
          Upload Study Material
        </h2>
        <p className="font-outfit text-[#A0ABBB] mb-[65px] text-[20px] ">
          Upload your own material for the AI to answer
        </p>
        <div className="flex flex-col gap-4">
          <Link href="/chatpdf">
            <button className="font-outfit w-full py-2 bg-[#0B2D85] dark:bg-[#2962EF] text-white hover:bg-primary/90 rounded-lg">
              Upload
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
