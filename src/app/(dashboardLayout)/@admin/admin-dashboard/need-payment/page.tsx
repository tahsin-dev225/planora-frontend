import NeedPaymentTable from "@/components/dashboard/need-payment-table";
import { CreditCard } from "lucide-react";

export default function AdminNeedPaymentPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight uppercase tracking-[0.2em]">Pending Payments</h1>
                <p className="text-muted-foreground text-lg flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-rose-500" />
                    Finalize your registration payments for upcoming events.
                </p>
            </div>

            <div className="mt-8">
                <NeedPaymentTable />
            </div>
        </div>
    );
}