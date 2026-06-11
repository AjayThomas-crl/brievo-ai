import type { Analysis } from "../types/analysis"

type Props={
    analysis:Analysis|null;
};
export default function SummaryCard({analysis}:Props){
    return (
        <>
        <h2 className="ml-45 mt-4 font-medium text-3xl">Summary</h2>
        <div className="mt-4 flex justify-center">
            
            <p className="bg-white min-h-100 w-3/4 p-4 rounded-3xl resize-none">{analysis?.summary}</p>
        </div>
        </>
        
    )
} 