//@ts-nocheck
'use client'
import { useEffect, useState } from "react";

function ImageItem({ prop }) {
  const [finalerror,seterror] = useState(prop?.error);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    if(finalerror)return;
    if(attempt>=3){
        setLoading(false);
        seterror(true);
        return;
    }
    const timer=setTimeout(()=>{
        const newimg=new Image();
        newimg.src=prop?.url;
        newimg.onload=()=>{
            setLoading(false);
            seterror(false);
        }
        newimg.onerror=()=>{
            setAttempt((prev)=>prev+1);
        }
    },2000);
   return ()=>clearTimeout(timer);
  }, [attempt]);

  const titleText = loading
    ? "loading..."
    : (prop?.ready && !finalerror)
      ? `Image loaded Successfully with retry count:${attempt}`
      : `Image Failed to Load with retry count:${attempt}`;

  return (
    
        <div>
          {( !loading && !finalerror) ? (
            <img
              src={prop?.url}
              alt=""
              className="h-[38px] w-[38px] bg-amber-400 rounded-full"
              title={titleText}
            />
          ) : (
            loading?<div 
  className="
    h-[38px] w-[38px] 
    rounded-full 
    border-4 
    border-gray-300 
    border-t-blue-500 
    animate-spin
  "
  title="Loading..."
></div>:<img
              src="https://www.freeiconspng.com/uploads/shiny-metal-red-error-image-designs-1.png"
              className="h-[38px] w-[38px]"
              title={titleText}
            />
          )}
        </div>
     
  );
}

export default ImageItem;
