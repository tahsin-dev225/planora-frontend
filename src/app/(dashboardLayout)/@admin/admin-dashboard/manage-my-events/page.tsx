import MyEventsList from "@/components/dashboard/my-events";
import { TrendingUp } from "lucide-react";

export default function AdminManageEventsPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Admin Event Control</h1>
                <p className="text-muted-foreground text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    Manage and optimize your created events with full visibility.
                </p>
            </div>

            <div className="mt-8">
                <MyEventsList />
            </div>
        </div>
    );
}
