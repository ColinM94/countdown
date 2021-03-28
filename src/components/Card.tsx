import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "contexts"
import { Divider } from "./Divider"

type Props = {
    children?: JSX.Element | JSX.Element[],
    title?: string,
}

export const Card = ({ children, title }: Props) => {
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
        <View style={styles.container}>
            {title != undefined &&
                <>
                    <Text style={[styles.text, styles.title]}>{title}</Text>
                </>
            }
            {children}
        </View>
    )
}



