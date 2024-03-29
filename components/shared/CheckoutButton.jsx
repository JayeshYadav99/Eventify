"use server"

import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs";
import { Button } from '../ui/button';
import Link from 'next/link';

import Checkout from './Checkout';

const CheckoutButton = async({event}) => {
  console.log("CheckoutButton",event)
  const {endDateTime}=event;
  console.log("Extraved",endDateTime)
  const endDate=new Date(endDateTime)
  const currentDate=new Date();
  console.log("Extraved Date",endDate)
  console.log("Current date", currentDate)
  console.log(endDate,"-->",currentDate);
  const user = await currentUser();
    const userId = user?.publicMetadata.userId ;
    console.log(user?.publicMetadata.userId)
    const hasEventFinished = endDate > currentDate;
  return (
    <div className="flex items-center gap-3">
    {!hasEventFinished ? (
      <p className="p-2 text-red-400">Sorry, tickets are no longer available.</p>
    ): (
      <>
        <SignedOut>
          <Button asChild className="button rounded-full" size="lg">
            <Link href="/sign-in">
              Get Tickets
            </Link>
          </Button>
        </SignedOut>

        <SignedIn>
          <Checkout event={event} userId={userId} />
        </SignedIn>
      </>
    )}
  </div>
  )
}

export default CheckoutButton
