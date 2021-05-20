import { signOut } from "api/auth"
import { useApp } from "contexts/AppContext"
import * as React from "react"
import { SettingsItem } from "./SettingsItem"

export const SettingsItemSignOut = () => {
    const { toast } = useApp()

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (err) {
            toast(err.message)
        }
    }

    return (
        <SettingsItem
            title="Sign Out"
            subtitle="Return to signin screen"
            icon="sign-out-alt"
            onPress={handleSignOut}
        />
    )
}
