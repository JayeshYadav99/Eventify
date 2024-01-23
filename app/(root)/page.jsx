import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { getAllEvents } from '@/lib/actions/event.actions'
import Collection from '@/components/shared/Collection'
const page = async() => {

const events=await getAllEvents({
  query:'',
  category:'',
  page:1,
  limit:6,

})
console.log(JSON.stringify(events))
// console.log(events.data[0
// ].category)
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Trust by <br /> Thousands of Events</h2>
      <div className="flex w-full flex-col gap-5 md:flex-row">

        
        </div>

        <Collection data={events.data}
        emptyTitle="No Events Found"
        emptyStateSubText="Come back later to see more events."
        limit={8}
        page={1}
        totalPages={2}
        collectionType="All_Events"
        />

        </section>
    </>
  );
}

export default page