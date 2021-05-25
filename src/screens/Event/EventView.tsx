import * as React from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { FAB } from "library/FAB"
import { useEvent } from "./Event"
import { EventCountdown } from "./EventCountdown"
import { EventTitle } from "./EventTitle"
import { useNavigation } from "@react-navigation/native"
import { useToast } from "contexts/ToastContext"
import { EventHeader } from "./EventHeader"

export const EventView = () => {
    const { theme } = useTheme()
    const { name, date, mode, handleUndo, handleSave, color } = useEvent()

    const styles = StyleSheet.create({
        content: {
            flex: 1,
            alignItems: "center",
            padding: theme.spacing.primary,
        },
        undoFAB: {
            bottom: 80,
        },
        container: {
            flex: 1,
            backgroundColor: color,
        },
        overlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <EventHeader />
                <View style={styles.content}>
                    <EventTitle />
                    <EventCountdown />
                    {mode === "edit" && (
                        <FAB icon="undo" style={styles.undoFAB} onPress={handleUndo} />
                    )}
                    {mode === "add" || mode === "edit" ? (
                        <FAB icon="check" onPress={handleSave} color="#32a852" />
                    ) : null}
                </View>
            </View>
        </View>
    )
}
