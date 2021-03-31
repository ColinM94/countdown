import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "contexts"
import { Pressable } from "./Pressable"

type Props = {
    children?: JSX.Element | JSX.Element[],
    title?: string,
    style?: {},
    onPress?: () => void,
    color?: "string"
}

export const Card = ({ children, title, style, onPress, color }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.card,
            padding: theme.spacing,
            margin: theme.spacing / 2,
            elevation: theme.elevation,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 1,
            alignContent: "stretch",
            borderRadius: theme.borderRadius,
            borderLeftColor: color ?? theme.colors.card,
            borderLeftWidth: 10,
            ...style
        },
        title: {
            ...theme.text.h1,
            color: theme.colors.text
        },
        text: {
            color: theme.colors.text
        }
    })

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <>
                {title != undefined && <Text style={[styles.text, styles.title]}>{title}</Text>}
                {children}
            </>
        </Pressable>
    )
}



