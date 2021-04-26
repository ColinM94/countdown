import { useTheme } from "contexts/ThemeContext"
import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

type DividerProps = {
    style?: StyleProp<ViewStyle>
}

export const Divider = ({ style }: DividerProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        divider: {
            height: 10,
            width: "100%",
            backgroundColor: "red",
        }
    })

    return (
        <View style={[styles.divider, style]} />
    )
}