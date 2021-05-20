import * as React from "react"
import { SettingsProps } from "navigation/types"
import { SettingsHeader } from "./SettingsHeader"
import { ScreenContainer } from "library/ScreenContainer"
import { SettingsItemDarkMode } from "./SettingsItemDarkMode"
import { SettingsItemSignOut } from "./SettingsItemSignOut"

export function Settings({ navigation, route }: SettingsProps) {
    return (
        <ScreenContainer>
            <SettingsHeader />
            <SettingsItemDarkMode />
            <SettingsItemSignOut />
        </ScreenContainer>
    )
}
