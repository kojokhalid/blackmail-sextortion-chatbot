import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Link, useLocation } from "react-router-dom";
// import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  // SidebarGroupLabel,
  // SidebarGroupContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import {
  File,
  MessageCircleMore,
  LifeBuoy,
  Info,
  LogIn,
  UserPlus,
  Users,
  Settings,
  BarChart3,
  BookOpen,
  Home,
  ExternalLink,
} from "lucide-react";
import safeguardchatdark from "../assets/safeguardchatdark.png";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";

// import { Input } from "antd";
// import MoonLoader from "react-spinners/MoonLoader";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "./ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axios from "axios";
// import { toast } from "@/hooks/use-toast";
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ChatData {
  sessionId: string;
  sessionTitle: string;
}

interface MenuItem {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
  isExternal?: boolean;
}

// const formSchema = z.object({
//   feedback: z.string().min(2, {
//     message: "Please enter at least 2 Characters",
//   }),
//   helpfulness: z.string().min(2, {
//     message: "Helpfulness must be atleast least 2 characters.",
//   }),
// });

export function AppSidebar({
  role,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     feedback: "",
  //     helpfulness: "",
  //   },
  // });
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   setLoading(true);
  //   await axios
  //     .post("http://localhost:8000/api/feedback/v1", values)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         toast({
  //           title: "Feedback submitted",
  //           description: "Thank you for your feedback",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Feedback not submitted",
  //         description: error,
  //       });
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }
  const { username, fetchWithAuth } = useAuthContext();
  const location = useLocation();
  const [chatdata, setChatdata] = useState<ChatData[]>([]);
  const [isLoading, setLoading] = useState(false);

  // Fetch user chat
  useEffect(() => {
    if (role === "user") {
      const getUserChat = async () => {
        setLoading(true);
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
  const userMenu: MenuItem[] = [
    { name: "Home", url: "/", icon: Home },
    { name: "Resources", url: "/resources", icon: BookOpen },
    { name: "Report", url: "/report", icon: File },
    { name: "AI Chat", url: "https://chat.cysafeguard.com", icon: MessageCircleMore, isExternal: true },
  ];

  const adminMenu: MenuItem[] = [
    { name: "Dashboard", url: "/admin", icon: BarChart3 },
    { name: "User Management", url: "/admin/users", icon: Users },
    { name: "Settings", url: "/admin/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon" {...props} variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center items-center justify-center text-sidebar-primary-foreground">
                  <img src={safeguardchatdark}/>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CY SafeGuard</span>
                  <span className="truncate text-xs">
                  Awareness and support for a safer digital world.
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {(role === "admin" ? adminMenu : userMenu).map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild isActive={isActivePath(item.url)}>
                  {item.isExternal ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <item.icon />
                      <span className="text-sm">{item.name}</span>
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </a>
                  ) : (
                    <Link to={item.url}>
                      <item.icon />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup> 
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="default">
                <LifeBuoy size={15} />
                <a
                  href={
                    "https://docs.google.com/forms/d/e/1FAIpQLScQ-NFz_75RORepkFrBZkVqwhnDCDL_7QS-kr-cs0JHz0Sv8g/viewform?usp=header"
                  }
                  target="_blank"
                >
                  <span className="text-sm">Feedback</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
           
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarMenuItem>
                    <Dialog>
              <DialogTrigger asChild><SidebarMenuButton size="default">
          <Info size={15} />
                  <span className="text-sm">About</span>
              </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] rounded-xl p-6">
  <DialogHeader>
  <div className="flex justify-center">
    
    <div className="size-36 p-4 rounded-full bg-muted flex items-center justify-center text-white text-4xl">
    <img src={safeguardchatdark}/>

    </div>
  </div>
    <DialogTitle className="text-2xl font-bold text-primary text-center">About Project SafeGuard</DialogTitle>
    
    <DialogDescription className="text-gray-600 mt-2">
      Project SafeGuard, an initiative by the University of Mines and Technology Cybersecurity class in Ghana,
      is dedicated to raising awareness about online blackmail and sextortion, providing resources and support
      to Ghanaians affected by these threats. Our student-led efforts aim to empower communities with the knowledge
      and tools to stay safe online.
    </DialogDescription>
  </DialogHeader>

  <div className="grid gap-4 mt-4">

    <div className="grid gap-3 text-gray-700">
      <p>
        Through workshops in schools, community campaigns, and digital resources, we educate Ghanaians
        on recognizing threats, protecting personal information, and seeking help from local authorities
        like the Ghana Police Service.
      </p>
      <p className="font-semibold text-primary">
        Join us in creating a safer digital Ghana!
      </p>
    </div>
  </div>

  <DialogFooter className="mt-4 flex justify-end gap-3">
    <DialogClose asChild>
      <Button variant="outline">Close</Button>
    </DialogClose>
    <Button 
      variant="default" 
      onClick={() => {
      }}
    >
      Learn More
    </Button>
  </DialogFooter>
</DialogContent>

                </Dialog>
            </SidebarMenuItem>
            </SidebarMenu>
</SidebarGroup>
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
                        <span className="text-sm text-neutral-500">
                          {item.sessionTitle}
                        </span>
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
                      <Skeleton className="h-6 w-[170px]" />
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
                  <Link to="/login" className="rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    <LogIn className="h-4 w-4" />
                    <span className="truncate">Login</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="default" asChild>
                  <Link to="/signup" className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                    <UserPlus className="h-4 w-4" />
                    <span className="truncate">Sign Up</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
