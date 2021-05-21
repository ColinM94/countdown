import * as React from "react"
import { LogBox } from "react-native"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faArrowLeft,
    faClock,
    faCog,
    faEllipsisV,
    faEye,
    faEyeSlash,
    faPlus,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"

import { AuthProvider } from "contexts/AuthContext"
import { AppProvider } from "contexts/AppContext"
import { ThemeProvider } from "contexts/ThemeContext"
import { Navigation } from "navigation/Navigation"
import { StatusBar } from "library/StatusBar"

export const Main = () => {
    LogBox.ignoreLogs(["Setting a timer", "index.tsx", "Require cycle"])
    library.add(
        faSignOutAlt,
        faEllipsisV,
        faCog,
        faEyeSlash,
        faPlus,
        faClock,
        faArrowLeft,
        faEye
    )

    return (
        <AppProvider>
            <AuthProvider>
                <ThemeProvider>
                    <Navigation />
                    <StatusBar />
                </ThemeProvider>
            </AuthProvider>
        </AppProvider>
    )
}
