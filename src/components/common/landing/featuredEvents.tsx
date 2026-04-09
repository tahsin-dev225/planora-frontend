"use client";

import { useGetFeaturedEventsQuery, useGetUpcomingEventsQuery } from '@/redux/features/eventSlice/eventSlice'
import { EventCard } from '../shared/eventCard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import CardLoading from '../shared/cardLoading'

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const FeaturedEvents = () => {
    const { data, isLoading } = useGetFeaturedEventsQuery()
    const events = data?.data ?? []

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-[500px]'>
                <div className="grid w-full max-w-7xl mx-auto px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <CardLoading key={i} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='max-w-7xl xl:max-w-[1200px] mx-auto  py-12'>
            <div className="text-center mb-12 px-6 lg:px-3">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/80 mb-3">Discover</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--heading-color)] dark:text-[var(--heading-color-dark)] tracking-tight">
                    Featured
                    <span className='text-primary'> Events</span>
                </h1>
                <p className="mt-4 text-gray-500 dark:text-white/40 text-sm max-w-md lg:max-w-2xl lg:mt-8 mx-auto">
                    Don't miss out on the most exciting events happening around you.
                </p>
            </div>

            {/* Swiper Slider Wrapper */}
            <div className="relative group">
                <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1280: { slidesPerView: 3 },
                    }}
                    className="pb-14" // Padding for pagination bullets
                >
                    {events?.map((event: any) => (
                        <SwiperSlide key={event?.id}>
                            <div className="p-1"> {/* Tiny padding to prevent shadow clipping */}
                                <EventCard event={event} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="w-full flex justify-center my-6 items-center">
                <Link href={"/events"}>
                    <Button size={"lg"} className="rounded-xl lg:text-lg px-8 bg-secondary hover:bg-teal-700 text-white transition-all">
                        View All Events
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>

            {/* Custom Swiper Styles */}
            <style jsx global>{`
                .swiper-pagination-bullet {
                    background: white !important;
                    opacity: 0.3;
                }
                .swiper-pagination-bullet-active {
                    background: #f43f5e !important; /* primary color */
                    opacity: 1;
                }
            `}</style>
        </div>
    )
}

export default FeaturedEvents