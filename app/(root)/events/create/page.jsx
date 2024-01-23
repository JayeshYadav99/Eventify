

import React from 'react'
import {auth} from "@clerk/nextjs"
import EventForm from '@/components/shared/EventForm'

const page = () => {

    const {sessionClaims}=auth()
    const userId=sessionClaims?.userId;
    console.log("userId",userId)
    console.log("ExtractedUserID",userId.userId)
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Events
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
}

export default page