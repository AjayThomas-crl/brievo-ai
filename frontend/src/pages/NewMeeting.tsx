import { useState } from "react";
import { motion } from "framer-motion";
import TranscriptInput from "@/components/TranscriptInput";
import SummaryCard from "@/components/SummaryCard";
import TaskCard from "@/components/TaskCard";
import type { Analysis } from "@/types/analysis";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
function NewMeeting() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

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
                    <BreadcrumbPage>New Meeting</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {/* Main content */}
          <div className="flex flex-1 flex-col gap-3 pt-0 ">
            <div className="mx-8">
              <TranscriptInput setAnalysis={setAnalysis} />
              <div>
                {analysis ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex-col mt-10"
                  >
                    <TaskCard analysis={analysis} />
                    <SummaryCard analysis={analysis} />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex-col mt-10"
                  >
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <h2 className="text-2xl font-semibold">No Analysis Yet</h2>
                    <p className="mt-2 text-card-subtle">
                      Paste your meeting transcript and click Analyze to
                      generate a summary and actionable tasks.
                    </p>
                  </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default NewMeeting;
