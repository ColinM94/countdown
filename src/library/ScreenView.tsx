import * as React from "react"
import { ListRenderItem, RefreshControl, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { useTheme } from "contexts/ThemeContext"

type ScreenViewProps = {
    children?: React.ReactNode | React.ReactNode[],
    onRefresh?: () => void,
    data?: any[],
    renderItem?: ListRenderItem<any>,
    headerComponent?: any,
    style?: StyleProp<ViewStyle>
}

export const ScreenView = ({ children, onRefresh, data, renderItem, headerComponent, style }: ScreenViewProps) => {
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

    const itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )

    return (
        <>
            {data ?
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onRefresh}
                        />
                    }
                    ListHeaderComponent={headerComponent}
                    ItemSeparatorComponent={itemSeparator}
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='always'
                />
                :
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='always'
                    refreshControl={
                        // Enables refresh functionality if a function has been passed in as onRefresh.  
                        <RefreshControl onRefresh={onRefresh} refreshing={false} enabled={onRefresh != undefined} />
                    }
                    style={style}
                >
                    {children}
                </ScrollView>}
        </>
    )
}