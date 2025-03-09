import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Link, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import {
  Command,
  File,
  Lightbulb,
  MessageCircleMore,
  LifeBuoy,
  LogIn,
  UserPlus,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";

interface ChatData {
  sessionId: string;
  sessionTitle: string;
}

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: "user" | "admin";
}

export function AppSidebar({ role, ...props }: SidebarProps) {
  const { username, fetchWithAuth } = useAuthContext();
  const location = useLocation();
  const [chatdata, setChatdata] = useState<ChatData[]>([]);
  const [isLoading, setLoading] = useState(true);

  // Fetch user chat
  useEffect(() => {
    if (role === "user") {
      const getUserChat = async () => {
        try {
          const response = await fetchWithAuth(
            "https://eve-chatbot-stmh.onrender.com/api/chat/auth",
            { method: "GET" }
          );
          if (response.ok) {
            const data = await response.json();
            setChatdata(data.data);
          } else {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Cannot fetch user chat");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      getUserChat();
    }
  }, [location, username, role]);

  const isActivePath = (path: string) => location.pathname === path;

  // Define menu items based on role
  const userMenu = [
    { name: "Resource Hub", url: "/resourcehub", icon: Lightbulb },
    { name: "Report", url: "/report", icon: File },
    { name: "New Chat", url: "/chat", icon: MessageCircleMore },
  ];

  const adminMenu = [
    { name: "Dashboard", url: "/admin", icon: BarChart3 },
    { name: "User Management", url: "/admin/users", icon: Users },
    { name: "Settings", url: "/admin/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon" {...props} variant="floating">
      {/* Sidebar Header */}
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

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarMenu>
            {(role === "admin" ? adminMenu : userMenu).map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild isActive={isActivePath(item.url)}>
                  <Link to={item.url}>
                    <item.icon />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Chat History (Only for Users) */}
        {role === "user" && username && (
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

      {/* Sidebar Footer */}
      <SidebarFooter>
        {/* Feedback Button */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LifeBuoy size={15} /> Feedback
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Auth Section */}
        {username ? (
          <NavUser
            user={{
              name: username,
              email: "user@example.com",
              avatar: "/avatars/user.jpg",
            }}
          />
        ) : (
          <>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="default" asChild>
                  <Button variant="outline" asChild>
                    <Link to="/login">
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
                      <UserPlus />
                      <span className="truncate">Sign Up</span>
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
