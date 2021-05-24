import * as React from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { FAB } from "library/FAB"
import { useEvent } from "./Event"
import { EventCountdown } from "./EventCountdown"
import { EventTitle } from "./EventTitle"

export const EventContent = () => {
    const { theme } = useTheme()
    const { name, date, mode, setMode } = useEvent()

    const styles = StyleSheet.create({
        content: {
            flex: 1,
            alignItems: "center",
            padding: theme.spacing.primary,
        },
    })

    const handleSavePress = () => {
        setMode("view")
    }

    return (
        <View style={styles.content}>
            <EventTitle name={name} date={date} />
            <EventCountdown />
            {mode === "edit" && <FAB icon="check" onPress={handleSavePress} />}
        </View>
    )
}
