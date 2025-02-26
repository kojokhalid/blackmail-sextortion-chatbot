"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Threat: Release of Private Photos",
    description:
      "If you don’t send GHS500, I’ll share your photos with everyone.",
    time: "5m ago",
    icon: "📸",
    color: "#E74C3C",
  },
  {
    name: "Threat: Public Exposure",
    description: "I know your secrets. Pay now, or everyone will find out.",
    time: "10m ago",
    icon: "🔓",
    color: "#F39C12",
  },
  {
    name: "Threat: Impersonation",
    description:
      "This is your friend. Send me your private pictures, or I’ll block you.",
    time: "15m ago",
    icon: "🎭",
    color: "#8E44AD",
  },
  {
    name: "Threat: Financial Blackmail",
    description:
      "Your bank account details are mine. Pay up to keep them private.",
    time: "20m ago",
    icon: "💳",
    color: "#3498DB",
  },
  {
    name: "Threat: Social Media Leak",
    description:
      "I have your chat history. Send GHS1,000, or I’ll post everything.",
    time: "30m ago",
    icon: "📱",
    color: "#C0392B",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-auto cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-mblack [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-mwhite text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-mwhite">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-mwhite">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden bg-mwhite",
        className
      )}
    >
      <AnimatedList delay={3000}>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
