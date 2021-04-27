import * as React from "react"
import { LogBox } from 'react-native'
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faHome, faCalendarPlus, faCalendarAlt, faBars, faCog, faPlus, faPencilAlt, faArrowLeft, faChevronRight, faCalendar, faClock, faLock, faEnvelope, faUser, faSignOutAlt, faEye, faEyeSlash, faChevronDown, faChevronUp, faCompress, faEllipsisV, faEdit, faTrash, faExpand, faExpandArrowsAlt, faCompressArrowsAlt } from "@fortawesome/free-solid-svg-icons"

import { AuthProvider } from "contexts/AuthContext"
import { StoreProvider } from "contexts/StoreContext"
import { StatusBar } from "library/StatusBar"
import { AppProvider } from "contexts/AppContext"
import { ThemeProvider } from "contexts/ThemeContext"
import { Navigation } from "navigation/Navigation"

export const Main = () => {
    LogBox.ignoreLogs(['Setting a timer', 'index.tsx', 'Require cycle'])
    library.add(faExpandArrowsAlt, faCompressArrowsAlt, faExpand, faTrash, faEdit, faEllipsisV, faCompress, faHome, faCalendarPlus, faCalendarAlt, faBars, faCog, faPlus, faPencilAlt, faArrowLeft, faChevronRight, faCalendar, faClock, faLock, faEnvelope, faUser, faSignOutAlt, faEye, faEyeSlash, faChevronRight, faChevronDown, faChevronUp)

    return (
        <AppProvider>
            <AuthProvider>
                <ThemeProvider>
                    <StoreProvider>
                        <StatusBar />
                        <Navigation />
                    </StoreProvider>
                </ThemeProvider>
            </AuthProvider>
        </AppProvider>     
    )
}
