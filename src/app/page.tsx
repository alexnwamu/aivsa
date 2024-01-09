'use client'
import { Chat } from '@/components/chat'
import CourseSelector from '@/components/course-selector'
import { ModeToggle } from '@/components/dark-mode-toggle'
import { Button } from '@/components/ui/button'
import { SignIn, UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'
import { useSession } from "@clerk/nextjs";
import { useCourseContext } from '@/app/contexts/chosencourse-context';
export default  function Home() {
  const { isLoaded, session, isSignedIn } = useSession();
const {isCourseChosen,setIsCourseChosen} = useCourseContext()

  return (
    <main className="relative container flex min-h-screen flex-col">
    <div className=" p-4 flex h-14 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <span className="font-bold">AI VSA</span>
<div className='flex items-center gap-2'>   <ModeToggle />   {
    isSignedIn ? <UserButton afterSignOutUrl='/' />  : ''
  } 
</div> 


     </div>
     <div className="flex flex-1 py-4">
  <div className="w-full">
    {isSignedIn  ?<div>
      { isCourseChosen ? <Chat/>:
          <CourseSelector />
      }
    
    </div> :   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Link href='/sign-in'>
  <Button >Login to get started </Button></Link>
    </div>}
  </div>
</div>

    </main>
  ) }