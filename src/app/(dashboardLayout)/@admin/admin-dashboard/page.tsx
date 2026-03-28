"use client";

import { useGetDashboardStatsQuery } from "@/redux/features/statsSlice/statSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  CalendarFold, 
  Users, 
  UserCheck, 
  Banknote,
  TrendingUp,
  Activity,
  ArrowUpRight
} from "lucide-react";

/**
 * AdminDashboardPage component
 * Displays a grid of key metrics for the administrator
 */
const AdminDashboardPage = () => {
    // Fetch statistics using RTK Query
    const { data, isLoading, isError } = useGetDashboardStatsQuery();
    
    // Extract stats from response
    const stats = data?.data;

    // Loading State
    if (isLoading) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-10 w-[250px]" />
                    <Skeleton className="h-4 w-[400px]" />
                </div>

                {/* Grid Skeletons */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="overflow-hidden border-muted/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-[60px]" />
                                <Skeleton className="mt-2 h-3 w-[80px]" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    // Error State
    if (isError) {
        return (
            <div className="flex h-[450px] items-center justify-center rounded-xl border border-dashed border-red-200 bg-red-50/50 p-8 text-center">
                <div className="space-y-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <Activity className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-red-900">Failed to load statistics</h3>
                    <p className="text-sm text-red-600/80">There was an error fetching the dashboard data. Please try again later.</p>
                </div>
            </div>
        );
    }

    // Stat cards configuration
    const cards = [
        {
            title: "Total Events",
            value: stats?.totalEvents || 0,
            description: "Scheduled & Ongoing",
            icon: CalendarFold,
            color: "text-blue-600",
            bg: "bg-blue-50",
            trend: "+2% from last week"
        },
        {
            title: "Total Users",
            value: stats?.toatalUsers || 0, // Using the key from the provided JSON response
            description: "Registered Accounts",
            icon: Users,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            trend: "+12.5% monthly"
        },
        {
            title: "Total Participants",
            value: stats?.totalParticipants || 0,
            description: "Event Attendees",
            icon: UserCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            trend: "+8.2% conversion"
        },
        {
            title: "Total Revenue",
            value: `$${stats?.totalRevenue?._sum?.amount || 0}`,
            description: "Gross Earnings",
            icon: Banknote,
            color: "text-amber-600",
            bg: "bg-amber-50",
            trend: "+1.5% profit"
        }
    ];

    return (
        <div className="space-y-10 p-0 md:p-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Greeting Header */}
            <div className="flex flex-col gap-1 ">
                <p className="text-muted-foreground text-xl flex my-4 items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    Your platform metrics and performance.
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 sm:grid-cols-2 space-y-5 lg:grid-cols-4 my-10">
                {cards.map((card, i) => (
                    <Card key={i} className="group relative overflow-hidden border-muted/60 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                        <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${card.bg.replace('bg-', 'from-').replace('-50', '-500')} opacity-0 transition-opacity group-hover:opacity-100`} />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {card.title}
                            </CardTitle>
                            <div className={`rounded-xl p-2 ${card.bg} ${card.color} ring-1 ring-black/5`}>
                                <card.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline justify-between">
                                <div className="text-2xl font-bold tracking-tight">
                                    {card.value}
                                </div>
                                <div className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
                                    <ArrowUpRight className="h-3 w-3" />
                                    <span>{card.trend.split(' ')[0]}</span>
                                </div>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>


        </div>
    );
};

export default AdminDashboardPage;
