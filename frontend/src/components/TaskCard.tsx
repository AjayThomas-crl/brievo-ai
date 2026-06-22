import type { Analysis } from "../types/analysis";
import { useEffect, useState } from "react";
import googlecalendar from "../icons/google-calendar.svg";
import calendericon from "../icons/calender.png";
import { Badge } from "./ui/badge";
import { addToGoogleCalender } from "@/lib/calender";
import type { Task } from "@/types/Task";
type Props = {
  analysis: Analysis | null;
};

export default function TaskCard({ analysis }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!analysis) return;

    setTasks(
      analysis.tasks.map((task,idx) => ({
        id: idx.toString(),
        title: task.task,
        priority: task.priority,
        date: task.date,
        time: task.time,
        duration: task.duration,
        description: task.description,
        checked: false,
      })),
    );
  }, [analysis]);
  const toggleTask = (taskId: string) => {
    setSelected((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };

  const taskCards = tasks.map((task) => {
    return (
      <div
        
        className="flex gap-3 bg-black border-1 border-border min-h-20  rounded-2xl p-4 mb-2"
      >
        <input
          type="checkbox"
          onChange={() => toggleTask(task.id)}
          checked={selected.includes(task.id)}
        />
        <div className="flex-1 flex-col gap-1">
          <div className="flex flex-col mb-">
            <div className="flex flex-row justify-between items-center">
              <p className="text-lg font-semibold ">{task.title}</p>
              {task.priority === "Low" ? (
                <Badge className="bg-green-50 text-green-700 ">Low</Badge>
              ) : task.priority === "Medium" ? (
                <Badge className="bg-yellow-950 text-yellow-300">Medium</Badge>
              ) : (
                <Badge className="bg-red-950 text-red-300">High</Badge>
              )}
            </div>

            <div className="flex flex-row gap-1 items-center  ">
              <img src={calendericon} className="w-3" />
              <p className="text-sm text-card-very-subtle font-semibold">
                {task.date}
              </p>
              <Badge className="ml-1" variant={"secondary"}>
                {task.time}
              </Badge>
              {task.duration && (
                <Badge className="ml-1" variant={"outline"}>
                  {task.duration}
                </Badge>
              )}
            </div>
          </div>
          <p className="text-sm text-card-subtle">{task.description}</p>
        </div>
      </div>
    );
  });

  const selectAll = () => {
    setSelected(tasks.map((task) => task.id));
  };
  const deselectAll = () => {
    setSelected([]);
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between">
        <h2 className="font-medium text-3xl ">Tasks</h2>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="bg-card border-border border-1  w-full p-5 rounded-3xl ">
          {taskCards}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between p-4 ">
        <div className="flex flex-row w-full items-center justify-between p-4 ">
          <div className="flex gap-3 items-center ">
            <input
              type="checkbox"
              onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
            />
            <p>Select All</p>
          </div>
          <div className="flex">
            <button
              onClick={async () => addToGoogleCalender(selected, tasks)}
              className="cursor-pointer flex gap-3 items-center px-6 py-2 bg-black border-2 border-[#383838] text-white rounded-lg hover:bg-[#e5e5e5] hover:text-black transition-colors duration-200"
            >
              <img className="w-6 h-6" src={googlecalendar} />
              Add to Google Calender
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
