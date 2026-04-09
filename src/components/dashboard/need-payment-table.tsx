"use client";

import { useGetNeedPaymentParticipantQuery, usePayForNeedPayMutation } from "@/redux/features/participantSlice/participantSlice";
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
import { toast } from "sonner";
import { CreditCard, Calendar, Loader2, ExternalLink, Ticket, DollarSign } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

const NeedPaymentTable = () => {
    const { data, isLoading, isError } = useGetNeedPaymentParticipantQuery();
    const [payForEvent, { isLoading: isPaying }] = usePayForNeedPayMutation();

    const participants = data?.data || [];

    const handlePayment = async (id: string) => {
        try {
            const response = await payForEvent({ id }).unwrap();
            
            if (response?.success && response?.data?.paymentUrl) {
                toast.success("Redirecting to checkout...");
                // Redirect to stripe checkout
                window.location.href = response.data.paymentUrl;
            } else {
                toast.error("Failed to generate payment link");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Payment initialization failed");
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
                <CardContent className="pt-6 text-center text-red-500 font-medium">
                    Critical Error: Failed to retrieve payment requests.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-muted/60 bg-background/50 backdrop-blur-xl border-dashed">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <CreditCard className="text-primary" />
                    Awaiting Payment
                </CardTitle>
                <CardDescription>
                    Complete your registration for events that require payment.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {participants.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground italic flex flex-col items-center gap-2">
                        <Ticket className="h-8 w-8 opacity-20" />
                        No payments currently pending.
                    </div>
                ) : (
                    <div className="rounded-xl border border-muted/50 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead className="w-[350px]">Event Details</TableHead>
                                    <TableHead>Event Date</TableHead>
                                    <TableHead>Registration Fee</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {participants.map((participant: any) => (
                                    <TableRow key={participant.id} className="hover:bg-muted/10 transition-colors group">
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-muted/50 shrink-0">
                                                    <Image 
                                                        src={participant.event?.banner || "/img/placeholder.jpg"} 
                                                        alt={participant.event?.title} 
                                                        fill 
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-sm line-clamp-1">{participant.event?.title}</span>
                                                    <Badge variant="outline" className="text-[10px] w-fit mt-1 bg-amber-500/10 text-amber-500 border-amber-500/20 font-black uppercase">
                                                        Approved - Pending Payment
                                                    </Badge>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm font-medium text-white/70">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-primary" />
                                                {format(new Date(participant.event?.date), "MMM dd, yyyy")}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 font-black text-emerald-400">
                                                <DollarSign size={16} />
                                                {participant.event?.fee}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button 
                                                onClick={() => handlePayment(participant.id)}
                                                disabled={isPaying}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black h-9 rounded-lg px-6 transition-all active:scale-95 flex items-center gap-2 ml-auto"
                                            >
                                                {isPaying ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    "Pay Now"
                                                )}
                                                <ExternalLink size={14} />
                                            </Button>
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

export default NeedPaymentTable;
