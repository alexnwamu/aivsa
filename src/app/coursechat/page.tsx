'use client'
import React from 'react'
import { useCourseContext } from "@/app/contexts/chosencourse-context";
import { Chat } from '@/components/chat';
import Link from 'next/link';
const CourseChat = () => { 
    const { isCourseChosen, setIsCourseChosen } = useCourseContext();
  return (
    <div>{
isCourseChosen ? <Chat/> :  <div className='text-center'><h1 className="mt-[200px] text-4xl mb-2">Select a course</h1>
<Link href='/selector' className='underline text-blue-600'>Go to Course Selector</Link>

            </div>
        }</div>
  )
}

export default CourseChat
