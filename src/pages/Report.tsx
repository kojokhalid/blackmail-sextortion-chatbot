import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
// import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
const Report = () => {
  const [date, setDate] = useState<Date>();
  return (
    <div className=" mx-auto w-[600px]">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Incident Reporting Form</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Please provide as much detail as possible about the incident,
          including any relevant dates, times, and descriptions of the events.{" "}
          <br></br>
          Your report will help the authorities to take appropriate action and
          prevent further incidents.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Card className="w-[600px] mt-10 bg-transparent">
          <CardHeader>
            <CardTitle>Incident Reporting Form</CardTitle>
            <CardDescription>
              Please fill out the form below to report an incident of blackmail
              or sextortion.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Your Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="incidentDate">Date of Incident</Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="flex w-auto flex-col space-y-2 p-2"
                    >
                      <Select
                        onValueChange={(value) =>
                          setDate(addDays(new Date(), parseInt(value)))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="rounded-md border">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Incident Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the incident in detail"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="evidence">Upload Evidence (if any)</Label>
                  <Input id="evidence" type="file" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Submit Report</Button>
          </CardFooter>
        </Card>

      
      </div>
      <div
      className={
        "flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row"
      }
    >
      {/* <MagicCard
        className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl"
      >
        Magic
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl"
      >
        Card
      </MagicCard> */}
    </div>
      <footer className=" bottom-0 w-full min-h-16 flex items-center p-4 justify-center text-black">
  <div className="text-center">
    <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
   
  </div>
</footer>
    </div>
    
  );
};
export default Report;
