import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./global.css";
import { ClerkProvider } from "@clerk/nextjs";
import CourseContextProvider from "./contexts/chosencourse-context";
import ChosenCourseContextProvider from "./contexts/chosen-course-data";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import {Quantico,Poppins,Outfit,} from 'next/font/google'

export const metadata: Metadata = {
  title: "AI Virtual Study Assistant",
  description: "Generated by create next app",
};

const quantico = Quantico({
subsets: ['latin'],
    
  weight: ["400","700",],
variable: '--font-quantico',
})
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
});
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${quantico.variable} ${poppins.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head />
      <body>
        <ClerkProvider>
          <Providers>
            <ChosenCourseContextProvider>
              <CourseContextProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <Navbar />
                  {children}
                  <Toaster />
                </ThemeProvider>
              </CourseContextProvider>
            </ChosenCourseContextProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
