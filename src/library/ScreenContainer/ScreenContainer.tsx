import * as React from "react"
import { StyleSheet, View, ViewProps } from "react-native"
import Constants from "expo-constants"
import { useTheme } from "contexts/ThemeContext"

interface ScreenContainerProps extends ViewProps {
    children: React.ReactNode | React.ReactNode[]
}

/** Prevents content going behind statusbar. */
export const ScreenContainer = ({ children, style }: ScreenContainerProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            paddingTop: Constants.statusBarHeight,
            flex: 1,
        },
    })

    return <View style={[styles.container, style]}>{children}</View>
}
