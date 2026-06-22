"use client";

import * as React from "react";
import { useAuth } from "@/context/AuthContext";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BotIcon, CalendarIcon } from "lucide-react";

const data = {
  teams: [
    {
      name: "Brievo AI",
      logo: <BotIcon />,
      plan: "",
    },
  ],

  navMain: [
    {
      title: "Meetings",
      url: "#",
      icon: <CalendarIcon />,
      isActive: true,
      items: [
        {
          title: "New Meeting",
          url: "/new-meeting",
        },
        {
          title: "Meeting History",
          url: "/history",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const userData = {
    name: user?.displayName ?? "User",
    email: user?.email ?? "",
    avatar: user?.photoURL ?? "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
