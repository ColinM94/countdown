import * as React from "react"
import { Platform } from "react-native"
import { StatusBar as ExpoStatusBar, StatusBarStyle } from "expo-status-bar"
import { useTheme } from "contexts"

export const StatusBar = () => {
    const { theme, darkMode } = useTheme()

    let style: StatusBarStyle = 'light'

    // If translucent is false. 
    /*     if (Platform.OS === 'ios') {
            style = darkMode ? 'light' : 'dark'
        } else if (Platform.OS === 'android') {
            style = darkMode ? 'light' : 'dark'
        } */

    style = darkMode ? 'light' : 'dark'


    return (
        <ExpoStatusBar style={style} /* translucent={false} */ />
    )
}
