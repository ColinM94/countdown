import { db } from "api/config"
import { EventInfo } from "common/types"
import * as React from "react"
import { ActivityIndicator, StyleSheet } from "react-native"
import { AuthContext, useAuth } from "./AuthContext"
import { useLoading } from "./LoadingContext"

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
    events: []
}
const StoreContext = React.createContext(initialState)

export const useStore = () => {
    return React.useContext(StoreContext)
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const [events, setEvents] = React.useState(initialState.events)

    const { userId } = useAuth()
    const { loading} = useLoading()

    React.useEffect(() => {
        if(!userId) return 

        loading(true)
        const unsubscribe = db.collection("users").doc(userId).collection("events")
            .onSnapshot(querySnapshot => {
                loading(true)
                let tempEvents: EventInfo[] = []

                querySnapshot.forEach(doc => {
                    let tempEvent: EventInfo = {
                        id: doc.id,
                        name: doc.data().name,
                        date: doc.data().date.toDate()
                    }
                    tempEvents.push(tempEvent)
                })
                setEvents(tempEvents)
                loading(false)
            })

        return () => unsubscribe()
    }, [userId])

    const value: Value = {
        events
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

