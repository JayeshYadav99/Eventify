import React from 'react'
import {auth} from "@clerk/nextjs"
import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/event.actions'
const page = async({params:{id}}) => {

    const {sessionClaims}=auth()
    const userId=sessionClaims?.userId;
const event=await getEventById(id)

console.log(event._id)


  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>
      <div className="wrapper my-8">
<EventForm  userId={userId} type="Update" event={event}  eventId={event._id}  />
      </div></>
  
  )
}

export default page