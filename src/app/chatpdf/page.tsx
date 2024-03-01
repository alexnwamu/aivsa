import FileUpload from "@/components/FileUpload";
import React from "react";
//The File Upload Page
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center  ">
            <div className="text-4xl lg:text-6xl font-bold mt-5 mb-4 md:mt-24">Upload your Document </div>
            <FileUpload/>

    </div>
  );
};

export default page;
