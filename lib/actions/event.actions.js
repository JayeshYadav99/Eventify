
"use server"

import { handleError } from "../utils"
import User from "../mongodb/database/models/user.model"
import Event from "../mongodb/database/models/event.model"
import Category from "../mongodb/database/models/category.model"
import connectToDatabase from "../mongodb/database"

import { revalidatePath } from 'next/cache'


const getCategoryByName = async name => {
    return Category.findOne({ name: { $regex: name, $options: "i" } })
  }
  
  const populateEvent = query => {
    return query
      .populate({
        path: "organizer",
        model: User,
        select: "_id firstName lastName"
      })
      .populate({ path: "category", model: Category, select: "_id name" })
  }
  
  // CREATE
  export async function createEvent({ userID, event, path }) {
    try {
      await connectToDatabase()
  
      const organizer = await User.findById(userID)
      if (!organizer) throw new Error("Organizer not found")
  
      const newEvent = await Event.create({
        ...event,
        category: event.categoryId,
        organizer: userID
      })
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
      handleError(error)
    }
  }
  
  // GET ONE EVENT BY ID
  export async function getEventById(eventId) {
    try {
      await connectToDatabase()
  
      const event = await populateEvent(Event.findById(eventId))
  
      if (!event) throw new Error("Event not found")
  
      return JSON.parse(JSON.stringify(event))
    } catch (error) {
      handleError(error)
    }
  }
  
  // UPDATE
  export async function updateEvent({ userId, event, path }) {
    try {
      console.log("Update event called",event,"-->",userId)
      await connectToDatabase()
  
      const eventToUpdate = await Event.findById(event._id)
      console.log(eventToUpdate)
      if (!eventToUpdate || eventToUpdate.organizer._id.toHexString() !== userId) {
        throw new Error("Unauthorized or event not found")
      }
  
      const updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        { ...event, category: event.categoryId },
        { new: true }
      )
     console.log(updateEvent)
      revalidatePath(path)
      return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
      handleError(error)
    }
  }
  
  // DELETE
  export async function deleteEvent({ eventId, path }) {
    try {
      await connectToDatabase()
  
      const deletedEvent = await Event.findByIdAndDelete(eventId)
      if (deletedEvent) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
  }
  
  // GET ALL EVENTS
  export async function getAllEvents({ query, limit = 6, page, category }) {
    try {
      await connectToDatabase()
  
      const titleCondition = query
        ? { title: { $regex: query, $options: "i" } }
        : {}
      const categoryCondition = category
        ? await getCategoryByName(category)
        : null
      const conditions = {
        $and: [
          titleCondition,
          categoryCondition ? { category: categoryCondition._id } : {}
        ]
      }
  
      const skipAmount = (Number(page) - 1) * limit
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(eventsCount / limit)
      }
    } catch (error) {
      handleError(error)
    }
  }
  
  // GET EVENTS BY ORGANIZER
  export async function getEventsByUser({ userId, limit = 6, page }) {
    try {
      await connectToDatabase()
      console.log("getEvenByUser",userId)
      const conditions = { organizer: userId }
      const skipAmount = (page - 1) * limit
  
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(eventsCount / limit)
      }
    } catch (error) {
      handleError(error)
    }
  }
  
  // GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
  export async function getRelatedEventsByCategory({
    categoryId,
    eventId,
    limit = 3,
    page = 1
  }) {
    try {
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = {
        $and: [{ category: categoryId }, { _id: { $ne: eventId } }]
      }
  
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(eventsCount / limit)
      }
    } catch (error) {
      handleError(error)
    }
  }