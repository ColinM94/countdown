import * as React from "react"
import { StyleSheet, View } from "react-native"
import { SettingsProps } from "navigation/types"
import { SettingsHeader } from "./SettingsHeader"
import { ScreenContainer } from "library/ScreenContainer"
import { SettingsItemDarkMode } from "./SettingsItemDarkMode"
import { SettingsItemSignOut } from "./SettingsItemSignOut"
import { useTheme } from "contexts/ThemeContext"

export function Settings({ navigation, route }: SettingsProps) {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        content: {
            padding: theme.spacing.primary,
        },
    })

    return (
        <>
            <SettingsHeader />
            <View style={styles.content}>
                <SettingsItemDarkMode />
                <SettingsItemSignOut />
            </View>
        </>
    )
}
