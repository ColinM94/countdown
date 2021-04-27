import * as React from "react"
import { StyleSheet, View } from "react-native"
import { Icon } from "./Icon"
import { useTheme } from "contexts/ThemeContext"
import { Pressable } from "./Pressable"

type FABProps = {
    onPress: () => void
}

export const FAB = ({ onPress }: FABProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            overflow: "hidden",
            borderRadius: 25,
            position: 'absolute',
            right: 12,
            bottom: 12
        },
        fab: {
            backgroundColor: theme.colors.primary,
            padding: 15
        },
    })

    return (
        <View style={styles.container}>
            <Pressable style={styles.fab} onPress={onPress}>
                <Icon icon="plus" size={20} color="white" />
            </Pressable>
        </View>
    )
}