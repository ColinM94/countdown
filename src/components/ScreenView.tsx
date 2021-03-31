import * as React from "react"
import { ScrollView, StyleSheet, RefreshControl } from "react-native"
import { useTheme } from "contexts"

type Props = {
    children?: JSX.Element | JSX.Element[],
    onRefresh?: () => void
}

export const ScreenView = ({ children, onRefresh }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            minHeight: "100%",
            padding: theme.spacing / 2,
        }
    })

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                // Enables refresh functionality if a function has been passed in as onRefresh.  
                <RefreshControl onRefresh={onRefresh} refreshing={false} enabled={onRefresh != undefined} />
            }
        >
            {children}
        </ScrollView>
    )
}
