import { updateUser } from "api/firestore"
import { useApp } from "contexts/AppContext"
import { useAuth } from "contexts/AuthContext"
import { useTheme } from "contexts/ThemeContext"
import * as React from "react"
import { Switch } from "react-native"
import { SettingsItem } from "./SettingsItem"

export const SettingsItemDarkMode = () => {
    const { theme, isDark, setIsDark } = useTheme()
    const { toast, loading } = useApp()
    const { currentUser } = useAuth()

    const toggleDarkMode = async () => {
        loading(true)
        setIsDark(!isDark)

        try {
            await updateUser(currentUser.id!, { darkMode: !isDark })
        } catch (err) {
            toast(err.message)
        }

        loading(false)
    }

    return (
        <SettingsItem
            title="Dark Mode"
            subtitle="Toggle dark theme"
            onPress={toggleDarkMode}
            rightContent={
                <Switch
                    value={isDark}
                    onValueChange={toggleDarkMode}
                    thumbColor={theme.colors.primary}
                    trackColor={{
                        false: theme.colors.accent,
                        true: theme.colors.primaryAccent,
                    }}
                    style={{ marginLeft: "auto" }}
                />
            }
        />
    )
}
