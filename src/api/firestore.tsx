import { db } from "./firebase"

export async function addEvent(name: string) {
    await db.collection("events").add({ name })
}