"use client"
import { useGetAllEventsQuery } from "@/redux/features/eventSlice/eventSlice";

const EventsPage = () => {
    const {data} = useGetAllEventsQuery();
    console.log(data);
    return (
        <div>
            <h1>Events</h1>
        </div>
    );
};

export default EventsPage;