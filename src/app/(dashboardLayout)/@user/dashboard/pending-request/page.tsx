import PendingFreeRequestTable from "@/components/dashboard/panding-free-request";
import PendingRequestTable from "@/components/dashboard/pending-paid-request";

export default function PendingRequestPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Pending Requests</h1>
                <p className="text-muted-foreground text-lg">
                    Manage join requests for your personal events.
                </p>
            </div>

            <div className="mt-8">
                <PendingRequestTable />
            </div>
            <div className="mt-8">
                <PendingFreeRequestTable />
            </div>
        </div>
    );
}
