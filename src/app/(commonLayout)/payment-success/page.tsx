import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex items-center flex-col space-y-4 justify-center">
          <CheckCheck className="text-green-500 rounded-full p-2 bg-green-500/20" size={40}/>
            <h1 className="text-4xl font-bold text-white">Payment Success</h1>
            <p className="text-white/70">Thank you for your purchase. Your Registration is successful.</p>
            <Link href="/">
                <Button variant="default" className="rounded-xl bg-teal-500/20 text-teal-500 border border-teal-500/20">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};