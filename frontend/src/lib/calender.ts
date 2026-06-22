import { toast } from "sonner";
import type { Task } from "@/types/Task";
export async function createCalenderEvent(
  summary: string,
  description:string,
  startTime: string,
  endTime: string,
  colorId:string
) {
  const accessToken = localStorage.getItem("googleAcessToken");
  if(!accessToken){
    throw new Error("Google access toke not found")
  }
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: summary,
        description:description,
        start: {
          dateTime: startTime,
        },
        end: {
          dateTime: endTime,
        },
        colorId:colorId
      }),
    },
  );
  return response.json();
}
function getDurationInMinutes(duration: string): number {
    const value = parseInt(duration, 10);

    if (duration.toLowerCase().includes("hour")) {
      return value * 60;
    }

    return value;
  }
    const priorityColor: Record<string, string> = {
    High: "11",
    Medium: "5",
    Low: "10",
  };
  
export const addToGoogleCalender = async (selected:string[],tasks:Task[]) => {
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
      toast.success(count + " Tasks added to Google Calender");
    } catch (error) {
      console.error(error);

      toast.error("Failed to add event to Google Calendar");
    }
  };