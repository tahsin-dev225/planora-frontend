"use client";

import { useGetMyEventsQuery, useDeleteEventMutation, useMakeFeaturedEventMutation, useGetAllEventsQuery, useGetEventForFeaturedQuery } from "@/redux/features/eventSlice/eventSlice";
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
import { 
  Calendar, 
  DollarSign, 
  Ticket, 
  Star,
  History,
  TrendingUp
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDeleteUserMutation, useGetAllUsersQuery, useMakeAdminMutation } from "@/redux/features/userSlice/userSlice";


const ManageUsers = () => {
    const [page, setPage] = useState<string>("1");
    const { data, isLoading, isError } = useGetAllUsersQuery(page);
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [makeAdmin, { isLoading: isMakingAdmin }] = useMakeAdminMutation();
console.log(data?.data);

    const users = data?.data || [];

    const handleUsers = async (id: string) => {
        try {
            await deleteUser({id}).unwrap();
            toast.success("User deleted successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete user");
        }
    };
    const handleMakeAdmin = async (id: string) => {
        try {
            await makeAdmin({id}).unwrap();
            toast.success("User made admin successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to make user admin");
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
                    Failed to load users. Please try again.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-muted/60 bg-background/50 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-2xl font-bold">Manage Users</CardTitle>
                    <CardDescription>
                        Track users, revenue, and attendee feedback.
                    </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {users?.length} Users Total
                </Badge>
            </CardHeader>
            <CardContent>
                {users?.length === 0 ? (
                    <div className="text-center py-20">
                        <History className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground italic">No users found.</p>
                        <Link href="add-events" className="mt-4 inline-block text-primary hover:underline font-medium">Create your first event</Link>
                    </div>
                ) : (
                    <div className="rounded-md border border-muted/50 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead className="w-[300px]">User Details</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead >Make Admin</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users?.map((user: any) => {
                                    return (
                                        <TableRow key={user.id} className="hover:bg-muted/10 transition-colors group">
                                            <TableCell>

                                                {user?.email}
                                            </TableCell>
                                            <TableCell>
                                                {user?.role}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-center ">
                                                    <Button 
                                                    disabled={isMakingAdmin || user?.role === "SUPER_ADMIN"}
                                                     onClick={() => handleMakeAdmin(user?.id as string)} 
                                                        className={user?.role !== "ADMIN" ? "bg-red-500 cursor-pointer hover:bg-red-600 text-white" : "bg-teal-900 cursor-pointer hover:bg-teal-800 text-white"}>
                                                        {user?.role !== "ADMIN" ? "Make Admin" : "Remove Admin"}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <div className="flex justify-center mt-4">
                            <Button onClick={() => setPage((prev) => (parseInt(prev) - 1).toString())} disabled={page === "1"} className="mr-2">Previous</Button>
                            <Button onClick={() => setPage((prev) => (parseInt(prev) + 1).toString())} disabled={page === data?.meta?.totalPages.toString()} className="ml-2">Next</Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ManageUsers;