import * as React from "react"
import { StyleSheet, View } from "react-native"
import { Icon } from "./Icon"
import { useTheme } from "contexts/ThemeContext"
import { Pressable } from "./Pressable"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

type FABProps = {
    onPress: () => void
    icon: IconProp
}

export const FAB = ({ onPress, icon }: FABProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        fab: {
            position: "absolute",
            borderRadius: 30,
            right: 16,
            bottom: 16,
            padding: 16,
            backgroundColor: theme.colors.primary,
        },
    })

    return (
        <Pressable style={styles.fab} onPress={onPress} feedbackColor="lightblue">
            <Icon icon={icon} size={20} color="white" />
        </Pressable>
    )
}