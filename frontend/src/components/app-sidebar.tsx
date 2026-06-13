"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  BotIcon,
  BookOpenIcon,
  FileTextIcon,
  CheckSquareIcon,
  Settings2Icon,
} from "lucide-react"
// This is sample data.
const data = {
  user: {
    name: "Ajay",
    email: "ajay@example.com",
    avatar: "/avatars/user.jpg",
  },

  teams: [
    {
      name: "Brievo AI",
      logo: <BotIcon />,
      plan: "Pro",
    },
  ],

  navMain: [
    {
      title: "Meetings",
      url: "#",
      icon: <BookOpenIcon />,
      isActive: true,
      items: [
        {
          title: "New Meeting",
          url: "/",
        },
        {
          title: "Meeting History",
          url: "/history",
        },
      ],
    },

    {
      title: "Summaries",
      url: "#",
      icon: <FileTextIcon />,
      items: [
        {
          title: "Saved Summaries",
          url: "/summaries",
        },
      ],
    },

    {
      title: "Tasks",
      url: "#",
      icon: <CheckSquareIcon />,
      items: [
        {
          title: "Action Items",
          url: "/tasks",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Settings",
      url: "/settings",
      icon: <Settings2Icon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
