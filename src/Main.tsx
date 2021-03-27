import * as React from "react"
import { StatusBar } from "expo-status-bar"
import { LogBox } from 'react-native'

import { ThemeProvider, ToastProvider } from "contexts"
import { ScreenView } from "components"
import { Navigation } from "navigation"

export const Main = () => {
    LogBox.ignoreLogs(['Setting a timer', 'index.tsx', 'Require cycle'])

    return (
        <ThemeProvider>
            <ToastProvider>
                <ScreenView>
                    <Navigation />
                </ScreenView>
                <StatusBar style="light" translucent={false} />
            </ToastProvider>
        </ThemeProvider>
    )
}
