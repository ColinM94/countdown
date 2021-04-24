import * as React from "react"
import { LogBox } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { enableScreens } from 'react-native-screens'

import { AppProvider } from "contexts/AppContext"
import { ThemeProvider } from "contexts/ThemeContext"
import { Navigation } from "navigation/Navigation"

// Icons. 
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faHome, faCalendarPlus, faCalendarAlt, faBars, faCog, faPlus, faPencilAlt, faArrowLeft, faChevronRight, faCalendar, faClock, faLock, faEnvelope, faUser, faSignOutAlt, faEye, faEyeSlash, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { AuthProvider } from "contexts/AuthContext"
import { StoreProvider } from "contexts/StoreContext"

export const Main = () => {
    LogBox.ignoreLogs(['Setting a timer', 'index.tsx', 'Require cycle'])
    enableScreens() // https://reactnavigation.org/docs/react-native-screens/
    library.add(faHome, faCalendarPlus, faCalendarAlt, faBars, faCog, faPlus, faPencilAlt, faArrowLeft, faChevronRight, faCalendar, faClock, faLock, faEnvelope, faUser, faSignOutAlt, faEye, faEyeSlash, faChevronRight, faChevronDown, faChevronUp)

    return (
        <ThemeProvider>
            <AppProvider>
                <AuthProvider>
                    <StoreProvider>
                        <StatusBar style="light" translucent={true}/>
                        <Navigation />
                    </StoreProvider>
                </AuthProvider>
            </AppProvider>     
        </ThemeProvider>
    )
}
