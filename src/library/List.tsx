import * as React from "react"
import { useTheme } from "contexts/ThemeContext"
import { FlatList, ListRenderItem, RefreshControl, StyleProp, View, ViewStyle, StyleSheet } from "react-native"

type ListProps = {
    children?: React.ReactNode | React.ReactNode[],
    onRefresh?: () => void,
    data?: any[],
    renderItem?: ListRenderItem<any>,
    headerComponent?: any,
    style?: StyleProp<ViewStyle>
}

export const List = ({data, renderItem, headerComponent, onRefresh, style}: ListProps) => {
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
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            refreshControl={ onRefresh &&
                <RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                />
            }
            ListHeaderComponent={headerComponent}
            ItemSeparatorComponent={itemSeparator}
            contentContainerStyle={[styles.container, style]}
            keyboardShouldPersistTaps='always'
        />
    )
}