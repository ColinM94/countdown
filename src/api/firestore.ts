import { db, Doc, DocData } from "./firebase"
import { Event } from "helpers/types"

// Convert firebase docs to objects. 
function docToEvent(doc: Doc) {
    let data = doc.data()

    let event: Event = {
        id: doc.id,
        name: data?.name
    }

    return event
}

// Event.
export async function addEvent(name: string) {
    await db.collection("events").add({ name })
}

export async function getEvent(id: string) {
    let doc = await db.collection("event").doc(id).get()
    return docToEvent(doc)
}

export async function getEvents() {
    const docs = await db.collection("events").get()

    const events: Array<Event> = []

    docs.forEach(doc => {
        events.push(docToEvent(doc))
    })

    return events
}

export async function deleteEvent(id: string) {
    await db.collection("events").doc(id).delete()
}

