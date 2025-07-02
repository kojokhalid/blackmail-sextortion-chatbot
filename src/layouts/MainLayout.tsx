import { AppSidebar } from "@/components/app-sidebar";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, Bell, User, Search } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const Footer = () => {
  return (
    <footer className="sticky bg-mwhite max-w-full min-h-16 items-center flex p-10 justify-center text-mblack">
      <div>All Rights Reserved</div>
    </footer>
  );
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar role="user"/>
      <SidebarInset>
        <main>
          {/* Enhanced Professional Header */}
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground transition-colors" />
                
                {/* Logo/Brand Section */}
                {/* <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Shield className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-sm font-semibold text-foreground">SafeGuard</span>
                    <span className="text-xs text-muted-foreground">Digital Protection</span>
                  </div>
                </div> */}
              </div>

              {/* Center Section - Status Badge */}
              {/* <div className="hidden md:flex items-center">
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  System Online
                </Badge>
              </div> */}

              {/* Right Section */}
              <div className="flex items-center gap-3">
                {/* Search Button - Hidden on small screens */}
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="hidden lg:flex h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button> */}

                {/* Notifications */}
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    2
                  </span>
                  <span className="sr-only">Notifications</span>
                </Button> */}

                {/* Emergency Help Button */}
                <Link to="/chat">
                  <RainbowButton className="text-sm h-9 px-4 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                    <Shield className="w-4 h-4 mr-2" />
                    Get Help Now
                  </RainbowButton>
                </Link>

                {/* User Profile */}
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button> */}
              </div>
            </div>
          </header>
          {/* Header ends here */}
          
          {/* Main Content Area */}
          <div className="flex-1">{children}</div>
        </main>
        {/* <Footer /> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
