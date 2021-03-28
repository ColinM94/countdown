import * as React from "react"
import { StyleSheet, Pressable, Text } from "react-native"
import { useTheme } from "contexts"

type Props = {
    onPress?: () => void,
    title: string
}

export const Button = ({ onPress, title }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            padding: theme.spacing,
            height: 50,
            width: 150,
            justifyContent: "center"
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
            style={styles.container}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}