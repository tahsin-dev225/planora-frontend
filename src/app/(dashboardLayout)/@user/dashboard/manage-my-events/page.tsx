import MyEventsList from "@/components/dashboard/my-events";
import { User, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserManageEventsPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Event Management</h1>
                <p className="text-muted-foreground text-lg flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Manage your personal events and monitor registration progress.
                </p>
            </div>


            <div className="mt-8">
                <MyEventsList />
            </div>
        </div>
    );
}
