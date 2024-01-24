"use client";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

import { useState } from "react";
import { Button } from "./ui/button";
import { useCourseContext } from "@/app/contexts/chosencourse-context";
import { useChosenCourseContext } from "@/app/contexts/chosen-course-data";
import Link from "next/link";

const CourseSelector = () => {
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
    setIsCourseChosen(courseChosen);
  };

  useEffect(() => {
    setDataToSend(selectedOption);
  }, [selectedOption]);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="border-2 px-4 py-4 rounded-2xl border-black last:">
        <h2 className="mb-4">What course would you like to study</h2>
        <div className="flex flex-col gap-4">
          <select
            className=" focus:outline-none"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="">Select an option</option>
            <option value="itgy400">ITGY 400</option>
            <option value="seng407">SENG 407</option>
          </select>
          <Button onClick={sendDataToBackend}>Proceed</Button>
          <Link href={"/chatpdf"}>
            <Button className="w-full">Chat with your pdf</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseSelector;
