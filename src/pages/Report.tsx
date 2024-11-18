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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
const Report = () => {
  return (
    <div className="flex justify-center items-center mx-auto">
      <Card className="w-[400px] min-h-[600px]">
        <CardHeader>
          <CardTitle>Report an Incident</CardTitle>
          <CardDescription>
            Report an Incident of Sextortion or Blackmail or both to Authority.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Report Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Sextortion</SelectItem>
                    <SelectItem value="sveltekit">Blackmail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <Textarea placeholder="Type your message here." id="message" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </CardFooter>
        <div className="flex flex-col space-y-1.5 justify-center items-center">
          <p>Call or Whatsapp</p>

          <Button className="text-xl">+233 123457868</Button>
        </div>
      </Card>
    </div>
  );
};
export default Report;
