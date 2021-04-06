import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "contexts"
import { Pressable } from "./Pressable"
import { StyleProp, ViewStyle } from "react-native"

type Props = {
    children?: JSX.Element | JSX.Element[],
    title?: string,
    style?: StyleProp<ViewStyle>,
    onPress?: () => void,
    direction?: "row" | "column"
}

export const Card = ({ children, title, style, onPress, direction = "column" }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            flexDirection: direction,
            backgroundColor: theme.colors.card,
            elevation: theme.elevation,
            borderRadius: theme.borderRadius,
            padding: theme.spacing(),
            justifyContent: "center",
            alignItems: "center",
            ...style as {},
        },
        title: {
            color: theme.colors.text.primary
        },
    })

    return (
        <Pressable style={styles.container} onPress={onPress ?? null}>
            {title != undefined && <Text style={[styles.title]}>{title}</Text>}
            {children}
        </Pressable>
    )
}



