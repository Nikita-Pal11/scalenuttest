//@ts-nocheck
'use client'
import { useEffect, useState } from "react";
import ImageItem from "./ImageItem";
function Img() {
  const [data,setData]=useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rep = await fetch("/api/imageapi");
        const val = await rep.json();
        setData(val.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
   const bool=data?.images?.some((val)=>val.error);
  return (
     <div className="w-full h-screen flex justify-center items-center">
     <div className="bg-black w-[400px] h-[200px] flex gap-2 items-center rounded-md">
    <div className="flex flex-wrap w-[50px] ml-8">
  {data?.images?.slice(0, 4).map((val, id) => (
    <div
      key={id}
      className="-m-2"
    >
      <ImageItem  prop={val} />
    </div>
  ))}
</div>
      <div className="text-white font-bold text-md">
        <h1>Super {data?.count}</h1>
        <p>Moradabad uttar Pradesh</p>
      </div>
      <div className=" ml-auto mr-8">
       {bool && <ImageItem/>}
      </div>
    </div>
   </div>
  )
}

export default Img
