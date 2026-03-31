"use client";

import { useGetMyPrivateFreeEventsQuery, useMakeNeedPaymentMutation, useUpdateParticipantStatusMutation } from "@/redux/features/participantSlice/participantSlice";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, X, Loader2, Calendar, User, Mail } from "lucide-react";
import { format } from "date-fns";

const PendingFreeRequestTable = () => {
  const { data, isLoading, isError } = useGetMyPrivateFreeEventsQuery();
  const [makeNeedPayment, { isLoading: isUpdating }] = useMakeNeedPaymentMutation();

  const requests = data?.data || [];

  const handleStatusUpdate = async (id: string, status: "REJECTED" | "APPROVED") => {
    try {
      await makeNeedPayment({ id, status }).unwrap();
      toast.success(`Request ${status.toLowerCase()} successfully`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  if (isLoading) {
    return (
        <Card className="animate-pulse border-muted/60 bg-muted/20 h-24">
        </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50/50">
        <CardContent className="pt-6 text-center text-red-600">
          Failed to load pending requests. Please try again later.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-muted/60 bg-background/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Participation Requests 
          <span className="text-rose-500">Private + Free</span></CardTitle>
        <CardDescription>
          Manage join requests for your private and Free events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No pending requests found.
          </div>
        ) : (
          <div className="rounded-md border border-muted/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[250px]">Participant</TableHead>
                  <TableHead>Event Details</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request: any) => (
                  <TableRow key={request.id} className="hover:bg-muted/10 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-muted/50">
                          <AvatarImage src={request.user?.image} alt={request.user?.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            <User size={16} />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{request.user?.name || "Anonymous User"}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail size={10} /> {request.user?.email || "No email"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col max-w-[300px]">
                        <span className="font-semibold line-clamp-1">{request.event?.title}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Badge variant="outline" className="text-[10px] uppercase font-bold py-0 h-4">
                            {request.event?.type}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Calendar size={10} /> {format(new Date(request.event?.date), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(request.createdAt), "MMM d, h:mm a")}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          request.status === "NEED_PAYMENT" 
                          ? "default" 
                          : request.status === "REJECTED" 
                          ? "destructive" 
                          : "secondary"
                        }
                        className={`text-[10px] font-bold uppercase ${request.status === "PENDING" ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20" : ""}`}
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {request.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-600"
                            onClick={() => handleStatusUpdate(request.id, "REJECTED")}
                            disabled={isUpdating}
                          >
                            <X size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600"
                            onClick={() => handleStatusUpdate(request.id, "APPROVED")}
                            disabled={isUpdating}
                          >
                            <Check size={16} />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Processed</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingFreeRequestTable;
