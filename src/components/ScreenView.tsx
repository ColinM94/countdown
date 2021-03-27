import * as React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { useTheme } from "contexts"

type Props = {
    children?: JSX.Element | JSX.Element[],
}

export const ScreenView = ({ children }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            minHeight: "100%",
            padding: theme.spacing / 4
        }
    })

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            {children}
        </ScrollView>
    )
}
