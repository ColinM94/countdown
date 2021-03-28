import * as React from "react"
import { ScreenView, Button, Card } from "components"
import { useTheme } from "contexts"
import { SettingsProps } from "navigation"

type Props = {

}

export function Settings({ }: Props) {
    const { theme, darkMode, setDarkMode } = useTheme()

    return (
        <ScreenView>
            <Card>
                <Button title={darkMode ? "Light Mode" : "Dark Mode"} onPress={() => setDarkMode(!darkMode)} />
            </Card>
        </ScreenView>
    )
}