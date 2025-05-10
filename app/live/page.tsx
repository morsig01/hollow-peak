import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { type Event } from '@/types/event'

export default async function Live() {
  const query = groq`
  *[_type == "event" && dateTime(now()) >= dateTime(startDate) && (!defined(endDate) || dateTime(now()) <= dateTime(endDate))]
  | order(date asc) {
    _id,
    title,
    date,
    location,
    registrationLink
  }
`

  const events = await client.fetch(query)
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Upcoming Events</h1>
        <div>
          {events.map((event: Event) => (
            <div 
              key={event._id} 
              className="bg-black rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow border-b-2 border-gray-600"
            >
              <div className="p-6 flex items-center justify-between gap-6">
                <h2 className="text-xl font-bold text-white w-1/4">{event.title}</h2>
                <p className="text-gray-300 w-1/6">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-300 w-1/6">{event.location}</p>
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 bg-white text-black px-4 py-2 rounded-sm hover:bg-gray-300"
                  >
                    Tickets
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}