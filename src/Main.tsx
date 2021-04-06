import * as React from "react"
import { LogBox } from 'react-native'
import { enableScreens } from 'react-native-screens'

import { ThemeProvider, ToastProvider, LoadingProvider } from "contexts"
import { Navigation } from "navigation"
import { StatusBar } from "components"

// Icons. 
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faHome, faCalendarPlus, faCalendarAlt, faBars, faCog, faPlus, faPencilAlt, faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
library.add(faHome, faCalendarPlus, faCalendarAlt, faBars, faCog, faPlus, faPencilAlt, faArrowLeft, faChevronRight)

export const Main = () => {
    LogBox.ignoreLogs(['Setting a timer', 'index.tsx', 'Require cycle'])
    enableScreens() // https://reactnavigation.org/docs/react-native-screens/

    return (
        <ThemeProvider>
            <ToastProvider>
                <LoadingProvider>
                    <StatusBar />
                    <Navigation />
                </LoadingProvider>
            </ToastProvider>
        </ThemeProvider>
    )
}
