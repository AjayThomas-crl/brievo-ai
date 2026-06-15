import type { Analysis } from "../types/analysis";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import googlecalendar from "../icons/google-calendar.svg";
import plusicon from "../icons/plus-solid-full.svg";
import calendericon from "../icons/calender.png";
import { Badge } from "./ui/badge";

type Props = {
  analysis: Analysis | null;
};
type Task = {
  id: string;
  title: string;
  priority: string;
  date: string;
  time: string;
  description: string;
  checked: boolean;
};
export default function TaskCard({ analysis }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!analysis) return;

    setTasks(
      analysis.tasks.map((task) => ({
        id: uuidv4(),
        title: task.task,
        priority: task.priority,
        date: task.date,
        time: task.time,
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
        key={task.id}
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
        <h2 className="font-medium text-3xl">Tasks</h2>
        <button className="flex items-center gap-2 px-6 py-2 bg-[#e5e5e5] text-[#1f1f1f] rounded-lg mr-4">
          <img src={plusicon} className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="bg-card border-border border-1 min-h-100 w-full p-4 rounded-3xl ">
          {taskCards}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between p-4 ">
        <div className="flex gap-3 items-center ">
          <input
            type="checkbox"
            onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
          />
          <p>Select All</p>
        </div>
        <div className="flex">
          <button className="flex items-center gap-2 px-6 py-2 bg-[#e5e5e5] text-[#1f1f1f] rounded-lg mr-4">
            <img src={plusicon} className="w-4 h-4" />
            Add Tasks
          </button>
          <button className="cursor-pointer flex gap-3 items-center px-6 py-2 bg-black border-2 border-[#383838] text-white rounded-lg hover:bg-[#e5e5e5] hover:text-black">
            <img className="w-6 h-6" src={googlecalendar} />
            Add to Google Calender
          </button>
        </div>
      </div>
    </div>
  );
}
