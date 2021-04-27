import * as React from "react"
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { Pressable, PressableProps } from "./Pressable"
import { Text } from "./Text"

export interface ButtonProps extends PressableProps {
    title?: string
    textStyle?: StyleProp<TextStyle>
}

export const Button = (props: ButtonProps) => {
    const { title, style, textStyle, ...rest } = props
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
        <Pressable
            style={[styles.button, style]}
            {...rest}
        >     
            <Text button style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    )
}