import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext"; // Adjust the path if necessary
import {
  Command,
  File,
  History,
  Lightbulb,
  MessageCircleMore,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { Link, useLocation } from "react-router-dom"; // Ensure React Router is being used for dynamic navigation
import { Button } from "@/components/ui/button";

const data = {
  user: {
    name: "antohshadrack",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

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

interface chatdata {
  sessionId: String;
  sessionTitle: String;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { username, fetchWithAuth } = useAuthContext();
  const location = useLocation();
  const [chatdata, setChatdata] = useState<chatdata[]>([]);
  const [isLoading, setLoading] = useState(true);
  // Fetch user chat
  const getUserchat = async () => {
    try {
      const response = await fetchWithAuth(
        "https://eve-chatbot-stmh.onrender.com/api/chat/auth",
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data);
        setChatdata(data.data); // Update username dynamically
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Cannot fetch user chat");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserchat();
  }, [location,username]);
 
  const isActivePath = (path: string) => location.pathname === path;
  return (
    <Sidebar collapsible="icon" {...props} variant="floating">
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
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActivePath("/resourcehub")}
              >
                <Link to="/resourcehub">
                  <Lightbulb />
                  <span className="text-sm">Resource Hub</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActivePath("/report")}>
                <Link to="/report">
                  <File />
                  <span className="text-sm">Report</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActivePath("/chat")}>
                <Link to="/chat">
                  <MessageCircleMore />
                  <span className="text-sm">New Chat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {/* Group for Chat Menu */}
        {username && (
          
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs">Chats</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {chatdata.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActivePath(`/chat/${item.sessionId}`)}
                    >
                      <Link to={`/chat/${item.sessionId}`}>
                        <span className="text-sm">{item.sessionTitle}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {isLoading && (
                  <SidebarMenuItem>
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-[220px]" />
                      <Skeleton className="h-6 w-[200px]" />
                      <Skeleton className="h-6 w-[190px]" />
                      <Skeleton className="h-6 w-[170px]" />
                    </div>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        {username ? (
          <NavUser user={data.user} />
        ) : (
          <>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="default" asChild>
                  <Button variant="outline" asChild>
                    <Link to="/login">
                      <div></div>
                      <LogIn />
                      <span className="truncate">Login</span>
                    </Link>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="default" asChild>
                  <Button variant="default" asChild>
                    <Link to="/signup">
                      <div></div>
                      <UserPlus />
                      <span className="truncate">Sign up</span>
                    </Link>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
