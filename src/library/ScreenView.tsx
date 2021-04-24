import * as React from "react"
import { ListRenderItem, RefreshControl, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { useTheme } from "contexts/ThemeContext"

type ScreenViewProps = {
    children?: React.ReactNode | React.ReactNode[],
    style?: StyleProp<ViewStyle>,
    onRefresh?: () => void,
}

export const ScreenView = ({ children, style, onRefresh }: ScreenViewProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            minHeight: "100%",
            padding: theme.spacing.primary,
        },
        itemSeparator: {
            height: theme.spacing.primary
        }
    })

    return (
        <ScrollView
            contentContainerStyle={[styles.container, style]}
            keyboardShouldPersistTaps='always'
            refreshControl={
                // Enables refresh functionality if a function has been passed in as onRefresh.  
                <RefreshControl onRefresh={onRefresh} refreshing={false} enabled={onRefresh != undefined} />
            }
        >
            {children}
        </ScrollView>
    )
}