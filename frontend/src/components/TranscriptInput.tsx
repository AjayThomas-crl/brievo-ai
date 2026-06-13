import React, { useState } from "react";
import type { Analysis } from "../types/analysis";

type Props = {
  setAnalysis: React.Dispatch<React.SetStateAction<Analysis | null>>;
};

export default function TranscriptInput({ setAnalysis }: Props) {
  const [transcript, settranscript] = useState<string>("");

  const handlechange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    settranscript(e.target.value);
  };

  const handleclick = async () => {
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: transcript,
      }),
    });
    const data: Analysis = await response.json();
    setAnalysis(data);
  };

  const handlereset = () => {
    settranscript("");
  };
  return (
    <>
      <textarea
        value={transcript}
        onChange={handlechange}
        placeholder="Paste your meeting transcript here...

John: Let's review the progress on the report generator project.
Sarah: The backend endpoints are complete and testing has started.
John: Please prepare a summary and action items for the team."
        className="bg-[#151515] min-h-50 w-full border-2 border-[#383838] text-white p-5 rounded-3xl  resize-none"
      />

      <div className="flex mt-4 gap-4">
        <button
          className="px-6 py-2 bg-[#e5e5e5] text-[#1f1f1f] rounded-lg"
          onClick={handleclick}
        >
          Analyze
        </button>
        <button
          className="cursor-pointer px-6 py-2 bg-black border-2 border-[#383838] text-white rounded-lg hover:bg-[#e5e5e5] hover:text-black"
          onClick={handlereset}
        >
          Reset
        </button>
      </div>
    </>
  );
}
