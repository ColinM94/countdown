import * as React from "react"
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { MyView, MyViewProps } from "./MyView"
import { Text } from "./Text"

export interface ButtonProps extends MyViewProps {
    title?: string
    placeholder?: string
    textStyle?: StyleProp<TextStyle>
}

export const Button = ({ title, style, textStyle, placeholder, onPress }: ButtonProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        button: {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.roundness,
            padding: theme.spacing.primary
        },
        text: {
            textAlign: "center"
        }
    })

    return (
        <MyView
            style={[styles.button, style]}
            onPress={onPress}
        >     
            <Text button style={[styles.text, textStyle]}>{title}</Text>
        </MyView>
    )
}