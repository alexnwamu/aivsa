'use client'
import { initialMessages,scrollToEnd } from "@/lib/utils";
import { ChatBubble } from "./chat-bubble";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Message,useChat } from "ai/react";
import { Spinner } from "./ui/spinner";
import { useRef ,useEffect} from "react";

export function Chat(){
    const {messages, data, input,handleInputChange,handleSubmit,isLoading} =useChat({
      initialMessages,
    })
  
const containerRef = useRef<HTMLDivElement | null>(null);

useEffect(()=>{
  setTimeout(()=>{
    scrollToEnd(containerRef),100 
  })
},[messages])
    return (
        <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
          <div className="p-6 overflow-auto" ref={containerRef} >
            {messages.map(({ id, role, content }: Message, index) => (
          <ChatBubble
          key={id}
          role={role}
          content={content}
          sources={[]}
          />
          
            ))} 
            
            </div>
           <form onSubmit={handleSubmit}  className="p-4 flex clear-both">
            <Input className="mr-2" value={input} onChange={handleInputChange} placeholder="Type to chat with AI"/>
            <Button type="submit" className="w-24">{isLoading ? <Spinner/> : "Ask"}</Button>
            </form> 
            
            
             </div>) }