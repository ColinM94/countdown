import * as React from "react"
import { StyleSheet, Text } from "react-native"
import { useTheme } from "contexts"
import { Pressable } from "components"

type Props = {
    onPress?: () => void,
    title: string,
    style?: {}
}

export const Button = ({ onPress, title, style }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            padding: theme.spacing(),
            height: 50,
            width: 150,
            justifyContent: "center",
            borderRadius: theme.borderRadius,
            ...style
        },
        text: {
            textAlign: "center",
            ...theme.typography.button as {},
        }
    })

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}