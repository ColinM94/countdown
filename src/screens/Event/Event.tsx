import * as React from "react"
import { ColorValue, StyleSheet, View, Text } from "react-native"
import { EventProps } from "navigation/types"
import { useTheme } from "contexts/ThemeContext"
import { EventHeader } from "./EventHeader"
import { EventContent } from "./EventContent"
import { useToast } from "contexts/ToastContext"

export type EventMode = "view" | "edit" | "add"

interface EventState {
    name: string
    setName: (name: string) => void
    date: Date
    setDate: (date: Date) => void
    color: ColorValue
    setColor: (color: ColorValue) => void
    image: any
    setImage: (image: any) => void
    mode: EventMode
    setMode: (mode: EventMode) => void
}

export const EventContext = React.createContext({} as EventState)

export const useEvent = () => {
    return React.useContext(EventContext)
}

export const Event = ({ navigation, route }: EventProps) => {
    const { theme } = useTheme()
    const { toast } = useToast()

    const eventInfo = route.params?.eventInfo
    const [name, setName] = React.useState(eventInfo?.name ?? "")
    const [date, setDate] = React.useState(eventInfo?.date ?? new Date())
    const [color, setColor] = React.useState(eventInfo?.color ?? theme.colors.card)
    const [image, setImage] = React.useState()
    const [mode, setMode] = React.useState<EventMode>("view")

    React.useEffect(() => {
        const listener = navigation.addListener("beforeRemove", (e) => {
            if (mode === "edit") {
                e.preventDefault()
                alert("Please save changes")
                toast("Please save changes")
            }
        })

        return () => navigation.removeListener("beforeRemove", listener)
    })

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color,
        },
        overlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
        },
    })

    const value: EventState = {
        name,
        setName,
        date,
        setDate,
        color,
        setColor,
        image,
        setImage,
        mode,
        setMode,
    }

    return (
        <EventContext.Provider value={value}>
            <View style={styles.container}>
                <View style={styles.overlay}>
                    <EventHeader />
                    <EventContent />
                    <Text>{mode}</Text>
                </View>
            </View>
        </EventContext.Provider>
    )
}
