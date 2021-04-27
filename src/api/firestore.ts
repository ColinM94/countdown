import { db, FirestoreDoc, FirestoreDocData } from "./config"
import { EventInfo } from "src/common/types"

// Convert firebase docs to objects. 
function docToEvent(doc: FirestoreDoc) {
    let data: FirestoreDocData = doc.data()

    let event: EventInfo = {
        id: doc.id,
        name: data?.name,
        date: data?.date.toDate(),
    }

    return event
}

export async function addUser(userId: string) {
    await db.collection("users").doc(userId).set({})
}

export async function getUser(userId: string) {
    let doc = await db.collection("users").doc(userId).get()
    return doc.data()
}

interface UserData {
    darkMode?: boolean,
    dateFormat?: string
}

export async function updateUser(userId: string, data: UserData) {
    await db.collection("users").doc(userId).update(data)
}

// Event.
export async function addEvent(userId: string, eventInfo: EventInfo) {
    await db.collection("users").doc(userId).collection("events").add(eventInfo)
}

export async function getEvent(id: string) {
    let doc = await db.collection("users").doc(id).get()

    if (!doc.exists) throw Error("Event not found!")

    return docToEvent(doc)
}

export async function getEvents(userId: string) {
    const docs = await db.collection("users").doc(userId).collection("events").orderBy("date", "desc").get()

    const events: Array<EventInfo> = []

    docs.forEach(doc => {
        events.push(docToEvent(doc))
    })

    return events
}

export async function updateEvent(userId: string, event: EventInfo) {
    await db.collection("users").doc(userId).collection("events").doc(event.id).update({
        name: event.name,
        date: event.date,
    })
}

export async function deleteEvent(userId: string, eventId: string) {
    await db.collection("users").doc(userId).collection("events").doc(eventId).delete()
}


/* Settings */
export async function addDateFormat(userId: string, dateFormat: string) {
    await db.collection("users").doc(userId).update({
        dateFormat: dateFormat
    })
}




