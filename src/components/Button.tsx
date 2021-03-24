import * as React from "react"
import { StyleSheet, Pressable, Text } from "react-native"
import { ThemeContext } from "contexts/ThemeContext"

type ButtonProps = {
    onPress?: () => void
    title: string
}

export const Button = ({ onPress, title }: ButtonProps) => {
    const { theme } = React.useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            /*       margin: theme.spacing / 2, */
            backgroundColor: theme.colors.primary,
            /*             padding: theme.spacing, */
            height: 50,
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