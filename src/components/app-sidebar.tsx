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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Input } from "antd";
import MoonLoader from "react-spinners/MoonLoader";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ChatData {
  sessionId: string;
  sessionTitle: string;
}

const formSchema = z.object({
  feedback: z.string().min(2, {
    message: "Please enter at least 2 Characters",
  }),
  helpfulness: z.string().min(2, {
    message: "Helpfulness must be atleast least 2 characters.",
  }),
});

export function AppSidebar({
  role,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
      helpfulness: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await axios
      .post("http://localhost:8000/api/feedback/v1", values)
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Feedback submitted",
            description: "Thank you for your feedback",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Feedback not submitted",
          description: error,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
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
        <SidebarGroup>
          <SidebarGroupContent>
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <LifeBuoy size={15} />
                      <span className="text-sm">Feedback</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Feedback</DialogTitle>
                  <DialogDescription>
                    Your input is valuable in helping us improve this project.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      {/* how helpful */}
                      <FormField
                        control={form.control}
                        name="helpfulness"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Was the chatbot helpful?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>

                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="feedback"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Feedback</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Lets have your feedback...."
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <MoonLoader size={20} color="#fff" />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
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
