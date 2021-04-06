import * as React from "react"
import { StyleSheet } from "react-native"

import { SettingsProps } from "navigation"
import { ScreenView, Button } from "components"
import { useTheme } from "contexts"

export function Settings({ navigation, route }: SettingsProps) {
    const { theme, darkMode, setDarkMode } = useTheme()

    const styles = StyleSheet.create({
        button: {
            marginBottom: theme.spacing(),
            width: "100%"
        }
    })

    const handleDarkModePress = () => setDarkMode(!darkMode)

    return (
        <ScreenView>
            <Button title={darkMode ? "Light Mode" : "Dark Mode"} onPress={handleDarkModePress} style={styles.button} />
        </ScreenView>
    )
}