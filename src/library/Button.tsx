import * as React from "react"
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { MyView, MyViewProps } from "./MyView"
import { Text } from "./Text"

export interface ButtonProps extends MyViewProps {
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
        <MyView
            style={[styles.button, style]}
            feedbackEnabled={true}
            {...rest}
        >     
            <Text button style={[styles.text, textStyle]}>{title}</Text>
        </MyView>
    )
}