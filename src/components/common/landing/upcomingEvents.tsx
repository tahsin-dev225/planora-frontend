
import { useGetUpcomingEventsQuery } from '@/redux/features/eventSlice/eventSlice'
import { EventCard } from '../shared/eventCard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import CardLoading from '../shared/cardLoading'

const UpcomingEvents = () => {
  const {data, isLoading} = useGetUpcomingEventsQuery()
  const events = data?.data ?? []

  if(isLoading){
    return <div className='flex items-center justify-center h-screen'>
      <div className="grid w-full max-w-7xl xl:max-w-[1200px] 3xl:max-w-[1400px] mx-auto px-6 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-6">
        {[...Array(2)].map((_, i) => (
          <CardLoading key={i} />
        ))}
      </div>
    </div>
  }

  return (
    <div className='max-w-7xl xl:max-w-[1200px] mx-auto px-6'>
      <div className="text-center mb-12 px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/80 mb-3">Discover</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Upcoming 
          <span className='text-rose-500'> Events</span> 
        </h1>
        <p className="mt-4 text-white/40 text-sm max-w-md lg:max-w-2xl lg:mt-8 mx-auto">
          Don't miss out on the most exciting events happening around you. Explore our curated selection of upcoming events and find your next adventure.
        </p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-6">
          {events?.map((event: any) => (
            <EventCard key={event?.id} event={event} />
          ))}
        </div>

        <div className="w-full flex justify-center my-6 md:my-8 lg:my-16 items-center">
          <Link href={"/events"}>
            <Button size={"lg"} className="rounded-xl lg:text-lg px-8 bg-teal-600 hover:bg-teal cursor-pointer-700 text-white">
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
          </Link>
        </div>
    </div>
  )
}

export default UpcomingEvents