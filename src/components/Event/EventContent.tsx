import * as React from "react"
import { EventInfo } from "common/types"
import { Timer } from "components/Event/EventTimer"
import { StyleSheet, View, Text } from "react-native"
import { formatDate } from "common/helpers"
import { useTheme } from "contexts/ThemeContext"

interface EventContentProps {
    eventInfo: EventInfo
}

export const EventContent = (props: EventContentProps) => {
    const { theme } = useTheme()
    const { eventInfo } = props

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
        },
        name: {
            marginTop: "auto",
            fontSize: 36,
            color: "rgba(255,255,255,0.87)",
        },
        date: {
            marginTop: theme.spacing.primary,
            fontSize: 24,
            color: "rgba(255,255,255,0.64)",
        },
        timer: {
            marginTop: "auto",
            marginRight: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
        },
        numberStyle: {
            fontSize: 56,
            color: "rgba(255,255,255,0.87)",
            padding: 10,
        },
        letterStyle: {
            fontSize: 28,
            color: "rgba(255,255,255,0.64)",
        },
    })

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{eventInfo.name}</Text>
            <Text style={styles.date}>{formatDate(eventInfo.date)}</Text>
            <Timer
                date={eventInfo.date}
                style={styles.timer}
                numberStyle={styles.numberStyle}
                letterStyle={styles.letterStyle}
                precision={6}
            />
        </View>
    )
}
