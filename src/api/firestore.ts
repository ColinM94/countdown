import { db, Doc, DocData } from "./firebase"
import { Event } from "src/common/types"

// Convert firebase docs to objects. 
function docToEvent(doc: Doc) {
    let data: DocData = doc.data()

    let event: Event = {
        id: doc.id,
        name: data?.name,
        date: data?.date.toDate(),
        color: data?.color
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
export async function addEvent(name: string, date: Date, color: string) {
    await db.collection("events").add({ name, date, color })
}

export async function getEvent(id: string) {
    let doc = await db.collection("events").doc(id).get()

    if (!doc.exists) throw Error("Event not found!")

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

