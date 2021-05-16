import * as React from "react"
import { db } from "api/config"
import { EventInfo } from "common/types"
import { useAuth } from "./AuthContext"
import { useApp } from "./AppContext"
import { docToEventInfo } from "api/firestore"

type StoreProviderProps = {
    children: JSX.Element | JSX.Element[]
}

type Value = {
    events: EventInfo[]
}

type State = {
    events: EventInfo[]
}

const initialState: State = {
    events: [],
}
const StoreContext = React.createContext(initialState)

export const useStore = () => {
    return React.useContext(StoreContext)
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const [events, setEvents] = React.useState(initialState.events)

    const { currentUser } = useAuth()
    const { loading } = useApp()

    React.useEffect(() => {
        if (!currentUser.id) return

        loading(true)
        const unsubscribe = db
            .collection("users")
            .doc(currentUser.id)
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
    }, [currentUser])

    const value: Value = {
        events,
    }

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    )
}
