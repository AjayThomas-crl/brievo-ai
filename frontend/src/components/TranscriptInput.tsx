import { useState } from "react"
export default function TranscriptInput(){
    const [transcript,settranscript]=useState<string>("")
    const handlechange = (
        e:React.ChangeEvent<HTMLTextAreaElement>
    )=>{
        settranscript(e.target.value)
    }
    const handleclick=()=>{
        console.log(transcript)
    }
    return (
        <>
            <div className="flex items-center justify-center my-4 ">
                <textarea
                    value={transcript}
                    onChange={handlechange}
                    className="bg-white min-h-100 w-3/4 p-4 rounded-3xl resize-none"
                />
                
            
            </div>
            <div className="flex ml-30">
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