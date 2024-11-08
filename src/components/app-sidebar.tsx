import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Clock,
  MessageCirclePlus,
  LifeBuoyIcon,
  BookOpenCheck,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadrack",
    email: "shadrack@gmail.com",
    avatar: "@/public/myimg.jpeg",
  },
  navMain: [
    {
      title: "New Chat",
      url: "#",
      icon: BookOpenCheck,
    },
    {
      title: "Chat History",
      url: "#",
      icon: Clock,
      items: [
        {
          title: "Chat1",
          url: "#",
        },
        {
          title: "Chat2",
          url: "#",
        },
        {
          title: "Chat3",
          url: "#",
        },
      ],
    },
    {
      title: "FAQs",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Sextortion",
          url: "#",
        },
        {
          title: "Blackmail",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Anita AI</span>
                  <span className="truncate text-xs">Sextortion & Blackmail Chatbot</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
