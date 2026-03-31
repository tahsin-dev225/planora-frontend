import NeedPaymentTable from "@/components/dashboard/need-payment-table";
import { TrendingUp } from "lucide-react";

export default function NeedPaymentPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight uppercase tracking-[0.2em]">Finalize Registration</h1>
                <p className="text-muted-foreground text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    Secure your spot by completing the payment for approved events.
                </p>
            </div>

            <div className="mt-8">
                <NeedPaymentTable />
            </div>
        </div>
    );
}