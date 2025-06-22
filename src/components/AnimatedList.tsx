import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string; // Will map to Tailwind classes
  time: string;
}

let notifications = [
  {
    name: "Threat: Release of Private Photos",
    description:
      "If you don’t send GHS500, I’ll share your photos with everyone.",
    time: "5m ago",
    icon: "📸",
    color: "bg-destructive", // Muted red for warnings
  },
  {
    name: "Threat: Public Exposure",
    description: "I know your secrets. Pay now, or everyone will find out.",
    time: "10m ago",
    icon: "🔓",
    color: "bg-accent", // Violet for warmth
  },
  {
    name: "Threat: Impersonation",
    description:
      "This is your friend. Send me your private pictures, or I’ll block you.",
    time: "15m ago",
    icon: "🎭",
    color: "bg-secondary", // Purple for empathy
  },
  {
    name: "Threat: Financial Blackmail",
    description:
      "Your bank account details are mine. Pay up to keep them private.",
    time: "20m ago",
    icon: "💳",
    color: "bg-primary", // Blue for trust
  },
  {
    name: "Threat: Social Media Leak",
    description:
      "I have your chat history. Send GHS1,000, or I’ll post everything.",
    time: "30m ago",
    icon: "📱",
    color: "bg-destructive", // Muted red for warnings
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-md cursor-pointer overflow-hidden rounded-[--radius] p-4",
        // Animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // Light styles
        "bg-card border border-border shadow-sm",
        // Dark styles
        "dark:bg-card dark:border-border dark:shadow-none dark:backdrop-blur-sm"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-[--radius]",
            color
          )}
        >
          <span className="text-lg text-foreground dark:text-foreground">
            {icon}
          </span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-foreground text-base font-semibold dark:text-foreground">
            <span className="text-sm sm:text-base">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-muted-foreground dark:text-muted-foreground">
              {time}
            </span>
          </figcaption>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
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
        "relative flex h-[400px] sm:h-[500px] w-full flex-col p-4 sm:p-6 overflow-hidden bg-card rounded-[--radius] border border-border shadow-sm dark:bg-card dark:border-border",
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