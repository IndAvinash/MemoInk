"use client";
import Card from "@/components/ui/card";
import { use, useEffect, useState } from "react";





export default function DiaryPage() {
  // const entrys = use(fetchEntries());
  const [lists, setLists] = useState<any[]>([]);
  const[left, setLeft] = useState<any[]>([]);
  const[right, setRight] = useState<any[]>([]);
   useEffect(() => {
    const fetchData = async () => {
try {
  const response = await fetch("http://localhost:3000/api/diary", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  if (response.ok) {
    setLists(data.entries);
    //  for(let i=0;i<lists.length;i++){
    //   if(i%2==0){
    //     setLeft((prev) => [...prev, lists[i]]);
    //     console.log("left",lists[i]);
    //   }else{
    //     setRight((prev) => [...prev, lists[i]]);
    //     console.log("right",lists[i]);
    //   }
    // }
    
  } else {
    console.error("Error fetching entries:", data.message);
  }
} catch (error) {
  console.error("Network error:", error);
}
    }

    fetchData();
    
   
  }, []);
  //  console.log(lists.length);
  useEffect(() => {
  if (lists.length > 0) {
    const leftEntries = lists.filter((_, index) => index % 2 === 0);
    const rightEntries = lists.filter((_, index) => index % 2 !== 0);
    setLeft(leftEntries);
    setRight(rightEntries);
  }
}, [lists]); 
  return (
    <div className="space-y-8 py-8">
        <h1 className="text-4xl font-bold text-[#5c3d2e]">
          Diary entries for admin@test.com
        </h1>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1 flex-1">
{/* left side*/}
{
            
          left.map((entr, index) => (
            
            <Card key={entr._id} className="p-4 w-full min-h-[50vh] min-w-62.5 max-h-[120vh]">
              <h2 className="text-xl text-center font-semibold mb-2">{entr.title}</h2>
              <p className="text-gray-700 line-clamp-20 ">{entr.content}</p>
            </Card>
          ))}
          </div>
          <div className="flex flex-col gap-1 flex-1">
{/* right side */}
{
            
         right.map((entr, index) => (
            
            <Card key={entr._id} className="p-4 w-full min-h-[50vh] min-w-62.5 max-h-[120vh]">
              <h2 className="text-xl text-center font-semibold mb-2">{entr.title}</h2>
              <p className="text-gray-700 line-clamp-20 ">{entr.content}</p>
            </Card>
          ))}
          </div>
        </div>
       
      </div>
  );
}
   
