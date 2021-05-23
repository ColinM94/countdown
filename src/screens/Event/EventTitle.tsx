import * as React from "react"
import { StyleSheet, View, Text } from "react-native"
import { formatDate, formatTime } from "common/helpers"
import { EventMode } from "./Event"

interface EventTitleProps {
    name: string
    date: Date
}

export const EventTitle = ({ name, date }: EventTitleProps) => {
    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
        },
        name: {
            color: "rgba(255,255,255,0.87)",
            fontSize: 64,
        },
        date: {
            color: "rgba(255,255,255,0.70)",
            fontSize: 32,
        },
        time: {
            color: "rgba(255,255,255,0.70)",
            fontSize: 24,
        },
    })

    return (
        <View style={styles.container}>
            <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
                {name}
            </Text>
            <Text style={styles.date} numberOfLines={1} adjustsFontSizeToFit>
                {formatDate(date)}
            </Text>
            <Text style={styles.time} numberOfLines={1} adjustsFontSizeToFit>
                {formatTime(date)}
            </Text>
        </View>
    )
}
