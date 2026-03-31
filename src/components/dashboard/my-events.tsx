"use client";

import { useGetMyEventsQuery, useDeleteEventMutation, useMakeFeaturedEventMutation } from "@/redux/features/eventSlice/eventSlice";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { 
  Edit, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Ticket, 
  Star, 
  MoreHorizontal,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  History
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useGetCurrentUserQuery } from "@/redux/features/userSlice/userSlice";

const MyEventsList = () => {
    const { data: user } = useGetCurrentUserQuery();
    const { data, isLoading, isError } = useGetMyEventsQuery();
    const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();
    const [makeFeaturedEvent, { isLoading: isMakingFeatured }] = useMakeFeaturedEventMutation();


    const events = data?.data || [];

    const handleDelete = async (id: string) => {
        try {
            await deleteEvent(id).unwrap();
            toast.success("Event deleted successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete event");
        }
    };
    // if user is admin or supper admin then user will show this button
    const handleMakeFeatured = async (id: string) => {
        try {
            await makeFeaturedEvent(id).unwrap();
            toast.success("Event made featured successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to make event featured");
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="animate-pulse border-muted/60 bg-muted/20 h-24" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="pt-6 text-center text-red-500">
                    Failed to load your events. Please try again.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-muted/60 bg-background/50 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-2xl font-bold">Manage My Events</CardTitle>
                    <CardDescription>
                        Track your events, revenue, and attendee feedback.
                    </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {events.length} Events Total
                </Badge>
            </CardHeader>
            <CardContent>
                {events.length === 0 ? (
                    <div className="text-center py-20">
                        <History className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground italic">You haven't created any events yet.</p>
                        <Link href="add-events" className="mt-4 inline-block text-primary hover:underline font-medium">Create your first event</Link>
                    </div>
                ) : (
                    <div className="rounded-md border border-muted/50 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead className="w-[300px]">Event Details</TableHead>
                                    <TableHead>Schedule</TableHead>
                                    <TableHead>Financial Summary</TableHead>
                                    <TableHead>Engagement</TableHead>
                                    {user?.data?.role === "ADMIN"
                                     || user?.data?.role === "SUPER_ADMIN"
                                     || user?.data?.role === "USER"
                                     && <TableHead className="text-center">Make Featured</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.map((event: any) => {
                                    const successfulPayments = event.payments?.filter((p: any) => p.status === "SUCCESS") || [];
                                    const totalRevenue = successfulPayments.reduce((sum: number, p: any) => sum + p.amount, 0);
                                    const ticketsSold = successfulPayments.length;
                                    const avgRating = event.reviews?.length > 0 
                                        ? (event.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / event.reviews.length).toFixed(1)
                                        : "N/A";

                                    return (
                                        <TableRow key={event.id} className="hover:bg-muted/10 transition-colors group">
                                            <TableCell>
                                                <div className="flex gap-4 items-center">
                                                    <div className="relative h-14 w-14 rounded-lg overflow-hidden border border-muted/50 shrink-0">
                                                        <Image 
                                                            src={event.banner || "/img/placeholder.jpg"} 
                                                            alt={event.title} 
                                                            fill 
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">{event.title}</span>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 h-4">
                                                                {event.type}
                                                            </Badge>
                                                            {event.isPaid && (
                                                                <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
                                                                    <DollarSign size={10} /> Paid
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col text-xs space-y-1">
                                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                                        <Calendar size={12} className="text-primary/70" />
                                                        {format(new Date(event.date), "MMM d, yyyy")}
                                                    </div>
                                                    <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">{event.time}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col space-y-1.5">
                                                    <div className="flex items-center gap-1.5 font-bold text-sm">
                                                        <TrendingUp size={14} className="text-emerald-500" />
                                                        ${totalRevenue.toLocaleString()}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                                        <Ticket size={12} /> {ticketsSold} Sold
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-500/20">
                                                        <Star size={10} className="fill-amber-500" />
                                                        {avgRating}
                                                    </div>
                                                    <span className="text-[10px] text-muted-foreground">({event.reviews?.length || 0} reviews)</span>
                                                </div>
                                            </TableCell>
                                            {
                                                user?.data?.role === "ADMIN" ||
                                                user?.data?.role === "SUPER_ADMIN"
                                                    && <TableCell className="text-right">
                                                    <div className="flex justify-center ">
                                                        <Button onClick={() => handleMakeFeatured(event.id)} className="bg-red-500 hover:bg-red-600 text-white">
                                                            {event.isFeatured ? "Unfeature" : "Make Feature"}
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            }
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MyEventsList;
