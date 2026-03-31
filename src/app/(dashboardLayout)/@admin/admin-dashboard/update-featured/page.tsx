import { TrendingUp } from "lucide-react";
import ManageEvent from "@/components/dashboard/admin/manage-event";

export default function AdminUpdateFeaturedPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Update Featured Events</h1>
                <p className="text-muted-foreground text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    Manage and optimize events with full visibility.
                </p>
            </div>

            <div className="mt-8">
                <ManageEvent />
            </div>
        </div>
    );
}
