"use client";
import { useState, useContext, createContext } from "react";
type ChosenCourseContextProviderProps = {
  children: React.ReactNode;
};
type CourseContext = {
  chosenCourse: string;
  setChosenCourse: React.Dispatch<React.SetStateAction<string>>;
};
export const ChosenCourseContext = createContext<CourseContext | null>(null);

export default function ChosenCourseContextProvider({
  children,
}: ChosenCourseContextProviderProps) {
  const [chosenCourse, setChosenCourse] = useState("");
  return (
    <ChosenCourseContext.Provider
      value={{
        chosenCourse,
        setChosenCourse,
      }}
    >
      {children}
    </ChosenCourseContext.Provider>
  );
}

export function useChosenCourseContext() {
  const context = useContext(ChosenCourseContext);
  if (!context) {
    throw new Error("Context must be used within the ContextProvider");
  }
  return context;
}
