import * as React from "react"
import { EventsList } from "./EventsList"
import { EventsHeader } from "./EventsHeader"
import { EventInfo } from "common/types"
import { db } from "api/config"
import { useAuth } from "contexts/AuthContext"
import { useApp } from "contexts/AppContext"
import { docToEventInfo } from "api/firestore"
import { EventsProps } from "navigation/types"
import { View } from "react-native"

export const Events = ({ navigation, route }: EventsProps) => {
    const { currentUser } = useAuth()
    const { loading } = useApp()

    const [events, setEvents] = React.useState<EventInfo[]>([])

    React.useEffect(() => {
        const unsubscribe = db
            .collection("users")
            .doc(currentUser.id!)
            .collection("events")
            .onSnapshot((querySnapshot) => {
                loading(true)
                let tempEvents: EventInfo[] = []

                querySnapshot.forEach((doc) => {
                    let tempEvent: EventInfo = docToEventInfo(doc)
                    tempEvents.push(tempEvent)
                })
                setEvents(tempEvents)
                loading(false)
            })

        return () => unsubscribe()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <EventsHeader navigation={navigation} />
            <EventsList data={events} />
        </View>
    )
}
