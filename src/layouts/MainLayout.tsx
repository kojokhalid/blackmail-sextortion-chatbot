import { AppSidebar } from "@/components/app-sidebar";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
export const Footer = () => {
  return (
    <footer className="sticky bg-mwhite max-w-full min-h-16 items-center flex p-10 justify-center text-mblack">
      <div>All Right Reserved</div>
    </footer>
  );
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <div className="py-6 ml-2 sticky top-0 z-10 bg-mwhite min-h-10 flex">
            <SidebarTrigger />
            <div className="absolute top-0 right-6 font-light">
              <RainbowButton className="mt-4 text-sm" >Get Help Now</RainbowButton>
            </div>
          </div>
          {children}
          <Footer />
        </main>
      </SidebarInset>
    </SidebarProvider>
    // <AntSideBar>
    //       {children}
    // </AntSideBar >
  );
}
