import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Users,
  FileText,
  ListTodo,
  Search,
} from "lucide-react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import type { Meeting } from "@/types/analysis";
import type { Task } from "@/types/Task";
import { addToGoogleCalender } from "@/lib/calender";
import googlecalendar from "../icons/google-calendar.svg";
import { useAuth } from "@/context/AuthContext";

const fetchMeetings = async (uid: string) => {
  const q = query(
    collection(db, "users", uid, "meetings"),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Meeting[];
};

function MeetingCard({ meeting }: { meeting: Meeting }) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const toggleTask = (taskId: string) => {
    setSelected((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };
  useEffect(() => {
    setTasks(
      meeting.tasks.map((task, idx) => ({
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
  }, [meeting]);
  const selectAll = () => {
    setSelected(tasks.map((task) => task.id));
  };
  const deselectAll = () => {
    setSelected([]);
  };

  return (
    <div className="bg-black border-1 border-border rounded-2xl p-4 mb-2">
      {/* Header row */}
      <div
        className="flex flex-row items-center justify-between cursor-pointer"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex-1 flex-col gap-1">
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-semibold">{meeting.title}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{meeting.duration}</Badge>
              <ChevronDown
                className={`w-5 h-5 text-card-very-subtle transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          <div className="flex flex-row gap-3 items-center mt-1">
            <div className="flex flex-row gap-1 items-center">
              <Clock className="w-3 h-3 text-card-very-subtle" />
              <p className="text-sm text-card-very-subtle font-semibold">
                {meeting.date} · {meeting.time}
              </p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Users className="w-3 h-3 text-card-very-subtle" />
              <p className="text-sm text-card-very-subtle font-semibold">
                {meeting.participants.length} participants
              </p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <ListTodo className="w-3 h-3 text-card-very-subtle" />
              <p className="text-sm text-card-very-subtle font-semibold">
                {meeting.tasks.length} tasks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-border">
              {/* Participants */}
              <div className="flex flex-row gap-2 items-center mb-4">
                <Users className="w-4 h-4 text-card-very-subtle" />
                <p className="text-sm text-card-subtle font-medium">
                  {meeting.participants.join(", ")}
                </p>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <div className="flex flex-row gap-2 items-center mb-2">
                  <FileText className="w-4 h-4 text-card-very-subtle" />
                  <p className="text-sm font-semibold text-card-subtle">
                    Summary
                  </p>
                </div>
                <p className="text-sm text-card-subtle leading-relaxed pl-6">
                  {meeting.summary}
                </p>
              </div>

              {/* Tasks */}
              <div>
                <div className="flex flex-row gap-2 items-center mb-2">
                  <ListTodo className="w-4 h-4 text-card-very-subtle" />
                  <p className="text-sm font-semibold text-card-subtle">
                    Tasks
                  </p>
                </div>
                <div className="flex flex-col gap-2 pl-6">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex gap-3 bg-[#151515] border-1 border-border min-h-16 rounded-2xl p-3"
                    >
                      <input
                        type="checkbox"
                        onChange={() => toggleTask(task.id)}
                        checked={selected.includes(task.id)}
                      />
                      <div className="flex-1 flex-col gap-1">
                        <div className="flex flex-row justify-between items-center">
                          <p className="text-base font-semibold">
                            {task.title}
                          </p>
                          {task.priority === "Low" ? (
                            <Badge className="bg-green-950 text-green-300 ">
                              Low
                            </Badge>
                          ) : task.priority === "Medium" ? (
                            <Badge className="bg-yellow-950 text-yellow-300">
                              Medium
                            </Badge>
                          ) : (
                            <Badge className="bg-red-950 text-red-300">
                              High
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-row gap-1 items-center">
                          <p className="text-sm text-card-very-subtle font-semibold">
                            {task.date}
                          </p>
                          <Badge variant="secondary">{task.time}</Badge>
                          {task.duration && (
                            <Badge variant="outline">{task.duration}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-card-subtle mt-1">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-row w-full items-center justify-between p-4 ">
                    <div className="flex gap-3 items-center ">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          e.target.checked ? selectAll() : deselectAll()
                        }
                      />
                      <p>Select All</p>
                    </div>
                    <div className="flex">
                      <button
                        onClick={async () =>
                          addToGoogleCalender(selected, tasks)
                        }
                        className="cursor-pointer flex gap-3 items-center px-6 py-2 bg-black border-2 border-[#383838] text-white rounded-lg hover:bg-[#e5e5e5] hover:text-black transition-colors duration-200"
                      >
                        <img className="w-6 h-6" src={googlecalendar} />
                        Add to Google Calender
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function History() {
  const [query, setQuery] = useState("");
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const {user}=useAuth()
  useEffect(() => {
    const loadMeetings = async () => {
      if (!user) return;

      const data = await fetchMeetings(user.uid);
      setMeetings(data);
    };

    loadMeetings();
  }, [user]);
  const filtered = meetings.filter(
  (m) =>
    m.title.toLowerCase().includes(query.toLowerCase()) ||
    m.summary.toLowerCase().includes(query.toLowerCase()) ||
    m.participants.some((p) =>
      p.toLowerCase().includes(query.toLowerCase())
    )
);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Meetings</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>History</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Main content */}
          <div className="flex flex-1 flex-col gap-3 pt-0">
            <div className="mx-8">
              {/* Page heading */}
              <div className="flex flex-row items-center justify-between mt-4">
                <div>
                  <h1 className="text-2xl font-semibold">Meeting History</h1>
                  <p className="text-card-subtle mt-1">
                    Your past meetings and their AI-generated briefs.
                  </p>
                </div>
              </div>

              {/* Search bar */}
              <div className="relative mt-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-card-very-subtle" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, summary, or participant..."
                  className="focus:outline-none focus:ring-0 bg-[#151515] w-full border-2 border-[#383838] text-white pl-11 pr-5 py-3 rounded-2xl"
                />
              </div>

              {/* Meeting count */}
              <p className="text-sm text-card-very-subtle mt-4 mb-2 font-semibold">
                {filtered.length}{" "}
                {filtered.length === 1 ? "meeting" : "meetings"}
              </p>

              {/* Meeting list */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-col"
              >
                <div className="bg-card border-border border-1 w-full p-5 rounded-3xl">
                  {filtered.length > 0 ? (
                    filtered.map((meetings) => (
                      <MeetingCard key={meetings.id} meeting={meetings} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-center">
                      <h2 className="text-xl font-semibold">
                        No meetings found
                      </h2>
                      <p className="mt-2 text-card-subtle">
                        Try adjusting your search terms.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
