'use client'
import { useState, useContext, createContext, } from "react"
type CourseContextProviderProps ={
    children : React.ReactNode
}
type CourseContext ={
    isCourseChosen: boolean;
    setIsCourseChosen: React.Dispatch<React.SetStateAction<boolean>>
}
export const CourseContext = createContext<CourseContext| null>(null)

export default function CourseContextProvider({children}:CourseContextProviderProps){

const [isCourseChosen,setIsCourseChosen]= useState(false);

return(

    <CourseContext.Provider
    value={{
        isCourseChosen,
        setIsCourseChosen,
    }}>

        {children}
    </CourseContext.Provider>
)



}

export function useCourseContext(){
    const context = useContext(CourseContext)
    if (!context){
        throw new Error('Context must be used within the ContextProvider')
    }
    return context
}