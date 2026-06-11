import type { Analysis } from "../types/analysis"

type Props={
    analysis:Analysis|null
}
export default function TaskCard({analysis}:Props){

    const taskCards=analysis?.tasks.map((task)=>{
        return <h3>{task.task} {task.priority}</h3>
    })

    console.log(taskCards)
    return (
        <>
        <h2 className="ml-45 mt-4 font-medium text-3xl">Tasks</h2>
        <div className="mt-4 flex justify-center">
            
        <p className="bg-white min-h-100 w-3/4 p-4 rounded-3xl resize-none">{taskCards}</p>
        </div>
        </>
        
    )
}