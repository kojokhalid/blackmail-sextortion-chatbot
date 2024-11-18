import React, { useState } from "react";
import {
  Command,
  ChevronRight,
  File,
  History,
  Lightbulb,
  MessageCircleMore,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { NavLink } from "react-router-dom"; // Ensure React Router is being used for dynamic navigation

const data = {
  user: {
    name: "antohshadrack",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  mainmenu: [
    { name: "Resource Hub", url: "/resourcehub", icon: Lightbulb },
    { name: "Report Incident", url: "/report", icon: File },
  ],
  chatMenu: [{ name: "Chat", url: "/chat", icon: MessageCircleMore }],
  chatHistoryMenu: {
    name: "Chat History",
    items: [
      { title: "chat session", url: "/chat/#1" },
      { title: "chat session", url: "/chat/#2" },
      { title: "chat session", url: "/chat/#3" },
    ],
    icon: History,
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeMainMenu, setActiveMainMenu] = useState<string>("/resourcehub");

  return (
    <Sidebar collapsible="icon" {...props} variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Eve Inc</span>
                  <span className="truncate text-xs">
                    Blackmail & Sextortion Fighter
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Group for Main Menu */}
        <SidebarGroup>
          <SidebarMenu>
            {data.mainmenu.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  onClick={() => setActiveMainMenu(item.url)}
                  className={`${activeMainMenu === item.url ? "bg-mblue" : ""}`}
                  asChild
                >
                  <NavLink to={item.url}>
                    <item.icon
                      className={`${
                        activeMainMenu === item.url
                          ? " text-mwhite"
                          : "text-mblue"
                      }`}
                    />
                    <span
                      className={`${
                        activeMainMenu === item.url
                          ? "text-sm font-light text-mwhite"
                          : "text-sm font-light text-slate-800"
                      }`}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Group for Chat Menu */}
        <SidebarGroup>
          <SidebarMenu>
            {data.chatMenu.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  onClick={() => setActiveMainMenu(item.url)}
                  className={`${
                    activeMainMenu === item.url ? "bg-mblue text-white" : ""
                  }`}
                  asChild
                >
                  <NavLink to={item.url}>
                    <item.icon
                      className={`${
                        activeMainMenu === item.url
                          ? " text-mwhite"
                          : "text-mblue"
                      }`}
                    />
                    <span
                      className={`${
                        activeMainMenu === item.url
                          ? "text-sm font-light text-mwhite"
                          : "text-sm font-light text-slate-800"
                      }`}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Group for Chat History */}
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={data.chatHistoryMenu.name}>
                  <data.chatHistoryMenu.icon className="text-mblue" />
                  <span className="text-sm font-light text-slate-800">
                    {data.chatHistoryMenu.name}
                  </span>
                  <ChevronRight
                    className={`ml-auto transition-transform duration-200 ${
                      activeMainMenu === data.chatHistoryMenu.name
                        ? "rotate-90"
                        : ""
                    }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {data.chatHistoryMenu.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <NavLink
                          to={subItem.url}
                          className={`${
                            activeMainMenu === subItem.url
                              ? "bg-mblue text-white"
                              : "text-xs font-light text-slate-800"
                          }`}
                          onClick={() => setActiveMainMenu(subItem.url)}
                        >
                          {subItem.title}
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
