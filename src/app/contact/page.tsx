"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const sendEmail = async () => {
    let dataSend = formData;
    console.log(dataSend);

    const res = await fetch(`/api/sendemail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // HANDLING ERRORS
      .then((res) => {
        console.log(res);
        if (res.status > 199 && res.status < 300) {
          alert("Sent Successfully !");
        }
      });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    sendEmail();
        setFormData({ name: "", email: "", message: "" });
  };
  return (
    <main>
      <div className="bg-[#F2F7F8] py-[80px] flex items-center flex-col justify-center">
        <div className="text-center">
          <h1 className="text-[#020817] font-semibold font-outfit text-[68px]">
            Contact Us
          </h1>
          <p className=" text-[18px] text-[#84878E] font-poppins mt-[24px]">
            {" "}
            Reach us when you need inquiry, help or if you want to provide
            feedback.
            <br /> If there’s anything, let us know
          </p>
        </div>
        <form

                    onSubmit={handleSubmit}
          className="px-[70px] py-[62px] w-[868px] rounded-[16px] bg-white mt-[54px]"
        >
          <p className="text-[#1D2630] font-poppins text-[18px] font-semibold mb-[14px]">
            Name
          </p>
          <input
            type="text"
            name="name"
                    value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            className="border mb-[35px]  py-[20px]  bg-transparent px-[16px] w-full rounded-[8px]"
            placeholder="Name"
          />
          <p className="text-[#1D2630] font-poppins text-[18px] font-semibold mb-[14px]">
            Email
          </p>
          <input
            required
            type="email"
                        value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            name="email"
            className="border mb-[35px]  bg-transparent  border-[rgba(202, 204, 207, 0.85)] py-[20px] px-[16px] w-full rounded-[8px]"
            placeholder="email@email.com"
          />
          <p className="text-[#1D2630] font-poppins  bg-transparent  text-[18px] font-semibold mb-[14px]">
            Message
          </p>
          <textarea
            required
                        value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            name="message"
            className="border h-[234px] mb-[35px] bg-transparent border-[rgba(202, 204, 207, 0.85)] py-[20px] px-[16px] w-full rounded-[8px]"
            placeholder="Type your message"
          />
          <button className="bg-[#0B2D85] w-full py-[23px] rounded-[8px] font-semibold text-[18px] font-outfit text-white">
            Submit
          </button>
        </form>
      </div>

      {/*Footer*/}
      <div className="px-[114px] py-[40px] bg-white dark:bg-[#020817] mt-[101px]">
        <div className="flex justify-between border-b-[2px] dark:border-b-[#19202F] border-b-[#EBEDF0] pb-5">
          <div>
            <Link href="/">
              <h1 className="font-quantico text-[26px]">AI VSA</h1>
            </Link>
            <p className="text-[#5F6F81] font-poppins mt-[15px]">
              Innovation and technology
            </p>
          </div>
          <div className="flex gap-[124px] text-[#1D2630] dark:text-white font-semibold text-[18px] font-poppins">
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        <div className="mt-[30px]">
          <p className="text-[#5F6F81] dark:text-[#B3B7BF] text-[14px] text-right font-poppins">
            © 2024 AI VSA. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
