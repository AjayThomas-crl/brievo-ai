import React, { useState } from "react"
import type  { Analysis } from "../types/analysis"

type Props={
    
    setAnalysis:React.Dispatch<React.SetStateAction<Analysis |null>>
};

export default function TranscriptInput({setAnalysis}:Props){
    const [transcript,settranscript]=useState<string>("")
    
    const handlechange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        settranscript(e.target.value)
    }

    const handleclick=async()=>{
    
        const response= await fetch("http://127.0.0.1:8000/analyze",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    text:transcript
                })
            }

        );
        const data:Analysis =await response.json();
        setAnalysis(data)

    }
    return (
        <>
            <div className="flex items-center justify-center my-4 ">
                <textarea
                    value={transcript}
                    onChange={handlechange}
                    className="bg-white min-h-100 w-3/4 p-5 rounded-3xl resize-none"
                />
                
            
            </div>
            <div className="flex ml-45">
                <button
                 className="px-6 py-2 bg-black text-white rounded-lg"
                 onClick={handleclick}
                 >
                    Analyze
                </button>
            </div>
        </>
    )
}