import * as React from "react"
import { StyleSheet, Pressable, Text } from "react-native"
import { useTheme } from "contexts"

type Props = {
    onPress?: () => void,
    title: string,
    style: {}
}

export const Button = ({ onPress, title, style }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        button: {
            backgroundColor: theme.colors.primary,
            padding: theme.spacing,
            height: 50,
            width: 150,
            justifyContent: "center",
            ...style
        },
        text: {
            color: "white",
            textAlign: "center",
        }
    })

    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: "grey" }}
            style={styles.button}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}