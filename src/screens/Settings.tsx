import * as React from "react"
import { StyleSheet, View } from "react-native"

import { SettingsProps } from "navigation"
import { Card, ScreenView, Text } from "components"
import { useTheme, useLoading } from "contexts"

import { Switch } from 'react-native-paper'

export function Settings({ navigation, route }: SettingsProps) {
    const { theme, darkMode, setDarkMode } = useTheme()

    const styles = StyleSheet.create({
        item: {
            paddingHorizontal: theme.spacing(2),
            marginBottom: theme.spacing()
        },
        button: {
            marginBottom: theme.spacing(),
            width: "100%"
        }
    })

    const handleDarkModePress = () => {
        setDarkMode(!darkMode)
    }

    return (
        <ScreenView>
            <Card direction="row" style={styles.item} onPress={handleDarkModePress}>
                <View>
                    <Text h3>Dark Mode</Text>
                    <Text subtitle>Toggle dark theme</Text>
                </View>
                <Switch value={darkMode} onValueChange={handleDarkModePress} color={theme.colors.primary} style={{ marginLeft: "auto" }} />
            </Card>
            <Card direction="row" style={styles.item} onPress={handleDarkModePress}>
                <View>
                    <Text h3>Dark Mode</Text>
                    <Text subtitle>Toggle dark theme</Text>
                </View>
                <Switch value={darkMode} onValueChange={handleDarkModePress} color={theme.colors.primary} style={{ marginLeft: "auto" }} />
            </Card>
        </ScreenView>
    )
}