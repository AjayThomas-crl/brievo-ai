import type { Analysis } from "../types/analysis";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import googlecalendar from "../icons/google-calendar.svg";

import calendericon from "../icons/calender.png";
import { Badge } from "./ui/badge";
import { createCalenderEvent } from "@/lib/calender";
import { toast } from "sonner";

type Props = {
  analysis: Analysis | null;
};
type Task = {
  id: string;
  title: string;
  priority: string;
  date: string;
  time: string;
  duration: string;
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
  const priorityColor: Record<string, string> = {
    High: "11",
    Medium: "5",
    Low: "10",
  };
  function getDurationInMinutes(duration: string): number {
    const value = parseInt(duration, 10);

    if (duration.toLowerCase().includes("hour")) {
      return value * 60;
    }

    return value;
  }
  const addToGoogleCalender = async () => {
    try {
      if (selected.length == 0) {
        toast.error("No tasks selected");
        return;
      }
      var count = 0;
      for (const task of tasks) {
        if (selected.includes(task.id)) {
          const start = new Date(`${task.date} ${task.time}`);

          const end = new Date(
            start.getTime() + getDurationInMinutes(task.duration) * 60 * 1000,
          );
          if (isNaN(start.getTime())) {
            console.error("Invalid date:", task);
            continue;
          }
          const startTime = start.toISOString();
          const endTime = end.toISOString();

          await createCalenderEvent(
            task.title,
            task.description,
            startTime,
            endTime,
            priorityColor[task.priority],
          );
          count += 1;
        }
      }
      toast.success(count+" Tasks added to Google Calender");
    } catch (error) {
      console.error(error);

      toast.error("Failed to add event to Google Calendar");
    }
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
        <div className="flex gap-3 items-center ">
          <input
            type="checkbox"
            onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
          />
          <p>Select All</p>
        </div>
        <div className="flex">
          <button
            onClick={addToGoogleCalender}
            className="cursor-pointer flex gap-3 items-center px-6 py-2 bg-black border-2 border-[#383838] text-white rounded-lg hover:bg-[#e5e5e5] hover:text-black transition-colors duration-200"
          >
            <img className="w-6 h-6" src={googlecalendar} />
            Add to Google Calender
          </button>
        </div>
      </div>
    </div>
  );
}
