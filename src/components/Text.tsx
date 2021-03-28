import * as React from "react"
import { StyleSheet, StyleProp, TextStyle, TextProps as TextProperties, Text as RNText } from "react-native"
import { useTheme } from "contexts"

type TextProps = TextProperties & {
    style?: StyleProp<TextStyle>,
    children?: string
}

export const Text = (props: TextProps) => {
    const { style, children = '' } = props

    const { theme } = useTheme()

    const styles = StyleSheet.create({
        text: {
            color: theme.colors.text,
            ...style as {}
        },
    })

    return (
        <RNText style={styles.text}>
            {children}
        </RNText>
    )
}