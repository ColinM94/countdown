import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "contexts"
import { Pressable } from "./Pressable"

type Props = {
    children?: JSX.Element | JSX.Element[],
    title?: string,
    style?: {},
    onPress?: () => void,
}

export const Card = ({ children, title, style, onPress }: Props) => {
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
            ...style
        },
        title: {
            ...theme.text.h1 as {},
            color: theme.colors.text,
            marginBottom: theme.spacing
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



