import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "contexts"
import { Divider } from "./Divider"

type CardProps = {
    children?: JSX.Element | JSX.Element[],
    title?: string,
}

export const Card = ({ children, title }: CardProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.cardBackground,
            padding: theme.spacing,
            margin: theme.spacing / 2,
            alignItems: "center",
            flexShrink: 1,
            flexGrow: 1
        },
        title: {
            fontSize: 20,
            fontWeight: "bold"
        },
        text: {
            color: theme.colors.cardText
        }
    })

    return (
        <View style={styles.container}>
            {title &&
                <>
                    <Text style={[styles.text, styles.title]}>{title}</Text>
                    <Divider />
                </>
            }
            {children}
        </View>
    )
}



