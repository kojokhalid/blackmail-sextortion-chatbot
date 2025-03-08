import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
type Feedback = {
  sessionId: string;
  feedback: number;
  createdAt: string;
  helpfulness: string;
};
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const Admin = () => {
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [isLoading, setLoading] = useState(true);
  var counter = 1;
  //   fetchfeedbackdata
  const getFeedbackData = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:8000/api/feedback/v1")
      .then((response) => {
        setFeedbackData(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Something went wrong, while fetching feedback data",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getFeedbackData();
  }, []);
  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="mb-6">
        <p>Feedbacks</p>
      </div>
      <Table>
        {/* <TableCaption>All Feedback</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Helpfulness</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </TableCell>{" "}
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </TableCell>{" "}
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </TableCell>
            </>
          )}
          {feedbackData.map((feedback) =>
            feedback.feedback && feedback.helpfulness ? (
              <TableRow key={feedback.createdAt}>
                <TableCell className="font-medium">{counter++}</TableCell>
                <TableCell>{feedback.helpfulness}</TableCell>
                <TableCell>{feedback.feedback}</TableCell>
                <TableCell>
                  {format(
                    new Date(feedback.createdAt),
                    "MMMM dd, yyyy hh:mm:ss a"
                  )}
                </TableCell>
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>
      <div className="mb-6 mt-14">
        <p>Short Responses</p>
      </div>
      <Table>
        {/* <TableCaption>All Responses</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <>
              <TableRow>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>{" "}
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </TableCell>
              </TableRow>
            </>
          )}

          {(() => {
            counter = 1;
            return null;
          })()}
          {feedbackData.map((feedback) =>
            feedback.sessionId && feedback.feedback ? (
              <TableRow key={feedback.createdAt}>
                <TableCell className="font-medium">{counter++}</TableCell>
                <TableCell className="font-medium">
                  {feedback.sessionId}
                </TableCell>
                <TableCell>{feedback.feedback}</TableCell>
                <TableCell>
                  {format(
                    new Date(feedback.createdAt),
                    "MMMM dd, yyyy hh:mm:ss a"
                  )}
                </TableCell>
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Admin;
