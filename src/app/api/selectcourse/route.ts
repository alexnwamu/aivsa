
import { processData } from "@/lib/utils";
import { courseChoices } from "@/lib/vector-store";
import { NextResponse,NextRequest } from "next/server";
let globalData;
export async function POST(req:NextRequest) {
  try {
    const {data} = await req.json()
    processData(data)
    globalData = data;
    console.log(globalData)
    courseChoices.push(globalData)
    console.log(courseChoices[courseChoices.length -1])
  return data
} catch (error) {
return NextResponse.json(`THe is Error is ${error}`)
 }

  
}

export function getNameSpace (){


}