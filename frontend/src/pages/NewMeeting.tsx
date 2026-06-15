import { useState } from "react";


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
  document.fonts.ready.then(() =>
    console.log([...document.fonts].map((f) => f.family)),
  );
  getComputedStyle(document.body).fontFamily;
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  return (
    // <div>
    //   <SidebarProvider>
    //     <AppSidebar />
    //     <main className="min-h-screen bg-[#0a0a0a] flex-1">
    //       <SidebarTrigger className="mb-4 bg-" />

    //     </main>
    //   </SidebarProvider>
    // </div>
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
                    <BreadcrumbLink href="#">
                      Build Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {/* Main content */}
          <div className="flex flex-1 flex-col gap-3 pt-0 ">
            <div className="mx-8">
              <TranscriptInput setAnalysis={setAnalysis} />
              <div className="flex gap-8 mt-10">
                <SummaryCard analysis={analysis} />
                <TaskCard analysis={analysis} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default NewMeeting;