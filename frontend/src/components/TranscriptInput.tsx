import React, { useState } from "react";
import type { Meeting } from "../types/analysis";
import { Loader2 } from "lucide-react";
type Props = {
  setMeeting: React.Dispatch<React.SetStateAction<Meeting | null>>;
};

export default function TranscriptInput({ setMeeting }: Props) {
  const [transcript, settranscript] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handlechange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    settranscript(e.target.value);
  };

  const handleclick = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://brievo-ai.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: transcript,
        }),
      });
      const data: Meeting = await response.json();
      setMeeting(data);
    } finally {
      setLoading(false);
    }
  };

  const handlereset = () => {
    settranscript("");
  };
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Paste your meeting transcript here....</h1>
      <textarea
        value={transcript}
        onChange={handlechange}
        placeholder="John: Let's review the progress on the report generator project.
Sarah: The backend endpoints are complete and testing has started.
John: Please prepare a summary and action items for the team...."
        className="focus:outline-none focus:ring-0 bg-[#151515] min-h-50 w-full border-2 border-[#383838] text-white p-5 rounded-3xl  resize-none"
      />

      <div className="flex mt-4 gap-4">
        <button
          className={`
    px-6 py-2 rounded-lg
    ${
      loading
        ? "opacity-50 cursor-not-allowed bg-[#e5e5e5] text-[#1f1f1f]"
        : "cursor-pointer bg-[#e5e5e5] text-[#1f1f1f] hover:bg-black hover:text-white hover:border-[#383838]"
    }
  `}
          onClick={handleclick}
          disabled={loading}
        >
          <div className="flex justify-center items-center">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Analyzing..." : "Analyze"}
          </div>
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
