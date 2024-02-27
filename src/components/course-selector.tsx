"use client";
import React, { ChangeEvent, FormEvent, useEffect } from "react";

import { useState } from "react";
import { Button } from "./ui/button";
import { useCourseContext } from "@/app/contexts/chosencourse-context";
import { useChosenCourseContext } from "@/app/contexts/chosen-course-data";
import { useRouter } from "next/navigation";
const CourseSelector = () => {
    const router = useRouter();
  const { isCourseChosen, setIsCourseChosen } = useCourseContext();
  const { chosenCourse, setChosenCourse } = useChosenCourseContext();
  const [selectedOption, setSelectedOption] = useState("");
  const [courseChosen, setCourseChosen] = useState(false);
  const [dataToSend, setDataToSend] = useState("");
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value); // Update selectedOption state with the selected value
    console.log(selectedOption);
  };
  const sendDataToBackend = () => {
    // const response = await axios.post("/api/chat", {
    //   nameSpace: dataToSend,
    //   messages: [],
    // });
    setChosenCourse(dataToSend);
    setCourseChosen(true);
    setIsCourseChosen(true);
    router.push("/coursechat");
  };

  useEffect(() => {
    setDataToSend(selectedOption);
  }, [selectedOption]);
  return (
    <div className="">
      <div className="">
    <h2 className="font-semibold font-outfit text-[33px] ">Select a course of Study</h2>
<p className="font-outfit text-[#A0ABBB] mb-[65px] text-[20px] ">What course would you like to study</p>
    <div className="flex flex-col gap-4">
        <select
        className=" focus:outline-none text-[#A0ABBB] bg-transparent  border-[#EEF2F5D9]  p-3 border font-poppins"
        value={selectedOption}
        onChange={handleSelectChange}
        >
        <option value="" selected disabled>-Select One-</option>
        <option value="itgy400">ITGY 400</option>
        <option value="seng407">SENG 407</option>
        </select>
        <Button className="font-outfit bg-[#0B2D85] dark:bg-[#2962EF] rounded-lg" onClick={sendDataToBackend}>Proceed</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseSelector;
