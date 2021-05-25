import * as React from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { FAB } from "library/FAB"
import { useEvent } from "./Event"
import { EventCountdown } from "./EventCountdown"
import { EventTitle } from "./EventTitle"
import { useNavigation } from "@react-navigation/native"
import { useToast } from "contexts/ToastContext"

export const EventContent = () => {
    const { theme } = useTheme()
    const { name, date, mode, setMode, undoChanges } = useEvent()
    const { toast } = useToast()
    const navigation = useNavigation()

    const styles = StyleSheet.create({
        content: {
            flex: 1,
            alignItems: "center",
            padding: theme.spacing.primary,
        },
        undoFAB: {
            bottom: 80,
        },
    })

    const handleSave = () => {
        toast("Saved")
        setMode("view")
    }

    const handleCreate = () => {
        toast("Event added")
        navigation.goBack()
    }

    return (
        <View style={styles.content}>
            <EventTitle name={name} date={date} />
            <EventCountdown />
            {mode === "edit" && (
                <>
                    <FAB icon="check" onPress={handleSave} color="#32a852" />
                    <FAB icon="undo" style={styles.undoFAB} onPress={undoChanges} />
                </>
            )}
            {mode === "add" && <FAB icon="check" onPress={handleCreate} />}
        </View>
    )
}
