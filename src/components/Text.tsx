import * as React from "react"
import { StyleSheet, StyleProp, TextStyle, TextProps as TextProperties, Text as RNText } from "react-native"
import { useTheme } from "contexts"

type TextProps = TextProperties & {
    style?: StyleProp<TextStyle>,
    children?: string | JSX.Element | JSX.Element[],
    h1?: boolean,
    h2?: boolean,
    h3?: boolean,
    subtitle?: boolean,
    body?: boolean,
    button?: boolean,
    caption?: boolean,
    overline?: boolean,
}

export const Text = (props: TextProps) => {
    const { theme } = useTheme()
    const { style, numberOfLines, h1, h2, h3, subtitle, body, button, caption, overline, children = '', ...rest } = props

    const getStyle = () => {
        if (h1) return theme.typography.h1
        if (h2) return theme.typography.h2
        if (h3) return theme.typography.h3
        if (subtitle) return theme.typography.subtitle
        if (body) return theme.typography.body
        if (button) return theme.typography.button
        if (caption) return theme.typography.caption
        if (overline) return theme.typography.overline
        return theme.typography.body
    }

    return (
        <RNText
            numberOfLines={h1 || h2 || h3 ? 1 : 0}
            ellipsizeMode={"tail"}
            style={[getStyle(), style]}
            {...rest}
        >
            {children}
        </RNText>
    )
}