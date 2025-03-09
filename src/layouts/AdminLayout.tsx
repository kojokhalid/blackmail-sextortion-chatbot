import { AppSidebar } from "@/components/app-sidebar";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Link } from "react-router-dom";
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar role="admin" />
      <SidebarInset>
        <main>
          <div className="py-6 sticky top-0 z-10 bg-white bg-opacity-50 backdrop-blur-md max-h-6 flex">
            <SidebarTrigger className="absolute top-2" />
            <div className="absolute top-0 right-6 font-light">
              <Link to="/report">
                <RainbowButton className="text-sm h-8 mt-2">
                  Get Help Now
                </RainbowButton>
              </Link>
            </div>
          </div>
          {/* Main Content Area */}
          <div>{children}</div>
        </main>
        {/* <Footer /> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
