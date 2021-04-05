import * as React from "react"
import { ScreenView, Button, Card } from "components"
import { useTheme } from "contexts"
import { SettingsProps } from "navigation"

export function Settings({ navigation, route }: SettingsProps) {
    const { theme, darkMode, setDarkMode } = useTheme()

    return (
        <ScreenView>
            <Card style={{ padding: 0 }}>
                <Button title={darkMode ? "Light Mode" : "Dark Mode"} onPress={() => setDarkMode(!darkMode)} style={{ width: "100%" }} />
            </Card>
        </ScreenView>
    )
}