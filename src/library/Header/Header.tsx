import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import Constants from "expo-constants"
import { useTheme } from "contexts/ThemeContext"

interface HeaderProps {
    children: React.ReactNode | React.ReactNode[]
}

export const Header = ({ children }: HeaderProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            paddingTop: Constants.statusBarHeight + 4,
            paddingBottom: 4,
            paddingHorizontal: theme.spacing.primary,
        },
    })

    return <View style={styles.container}>{children}</View>
}
