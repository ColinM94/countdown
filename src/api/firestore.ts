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

/* export async function eventsListener() {
    const query = db.collection('events')

    const observer = query.onSnapshot(querySnapshot => {
        const events: Array<Event> = []

        querySnapshot.forEach(doc => {
            events.push(docToEvent(doc))
        })

        return 
    }, err => {
        alert(err)
    })

    return observer
}
 */
// Event.
export async function addEvent(eventInfo: EventInfo) {
    await db.collection("events").add(eventInfo)
}

export async function getEvent(id: string) {
    let doc = await db.collection("events").doc(id).get()

    if (!doc.exists) throw Error("Event not found!")

    return docToEvent(doc)
}

export async function getEvents() {
    const docs = await db.collection("events").orderBy("date", "desc").get()

    const events: Array<EventInfo> = []

    docs.forEach(doc => {
        events.push(docToEvent(doc))
    })

    return events
}

export async function updateEvent(event: EventInfo) {
    await db.collection("events").doc(event.id).update({
        name: event.name,
        date: event.date,
    })
}

export async function deleteEvent(id: string) {
    await db.collection("events").doc(id).delete()
}

