import * as React from "react"
import { StatusBar } from "expo-status-bar"
import { LogBox } from 'react-native'
import { enableScreens } from 'react-native-screens'

import { ThemeProvider, ToastProvider, LoadingProvider } from "contexts"
import { Navigation } from "navigation"

// Icons. 
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faHome, faCalendarPlus, faCalendarAlt, faBars, faCog, faPlus, faPencilAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
library.add(faHome, faCalendarPlus, faCalendarAlt, faBars, faCog, faPlus, faPencilAlt, faArrowLeft)

export const Main = () => {
    LogBox.ignoreLogs(['Setting a timer', 'index.tsx', 'Require cycle'])
    enableScreens() // https://reactnavigation.org/docs/react-native-screens/

    return (
        <ThemeProvider>
            <ToastProvider>
                <LoadingProvider>
                    <Navigation />
                    <StatusBar style="light" translucent={false} />
                </LoadingProvider>
            </ToastProvider>
        </ThemeProvider>
    )
}
