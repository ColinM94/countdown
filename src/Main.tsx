import * as React from "react"
import { LogBox } from "react-native"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faArrowLeft,
    faCalendarAlt,
    faCheck,
    faClock,
    faCog,
    faEllipsisV,
    faEye,
    faEyeSlash,
    faImage,
    faPalette,
    faPencilAlt,
    faPlus,
    faSignOutAlt,
    faTrash,
    faUndo,
} from "@fortawesome/free-solid-svg-icons"

import { AuthProvider } from "contexts/AuthContext"
import { AppProvider } from "contexts/AppContext"
import { ThemeProvider } from "contexts/ThemeContext"
import { Navigation } from "navigation/Navigation"
import { StatusBar } from "library/StatusBar"
import { ToastProvider } from "contexts/ToastContext"

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
        faEye,
        faEyeSlash,
        faPencilAlt,
        faPalette,
        faImage,
        faCheck,
        faTrash,
        faUndo,
        faCalendarAlt
    )

    return (
        <AppProvider>
            <ToastProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <Navigation />
                        <StatusBar />
                    </ThemeProvider>
                </AuthProvider>
            </ToastProvider>
        </AppProvider>
    )
}
