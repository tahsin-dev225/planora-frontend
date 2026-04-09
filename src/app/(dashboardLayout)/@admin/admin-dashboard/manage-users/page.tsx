import ManageUsers from "@/components/dashboard/admin/manage-users";
import { TrendingUp } from "lucide-react";

const ManageUsersPage = () => {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-xl text-primary font-bold tracking-tight">Super Admin</h1>
                <h1 className="text-3xl font-bold tracking-tight">Manage Users page </h1>
                <p className="text-muted-foreground text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    Manage and optimize users with full visibility.
                </p>
            </div>

            <div className="mt-8">
                <ManageUsers />
            </div>
        </div>
    );
};

export default ManageUsersPage;