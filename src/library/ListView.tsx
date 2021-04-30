import * as React from "react"
import { useTheme } from "contexts/ThemeContext"
import { FlatList, ListRenderItem, RefreshControl, StyleProp, View, ViewStyle, StyleSheet, FlatListProps } from "react-native"

interface ListProps {
    children?: React.ReactNode | React.ReactNode[]
    onRefresh?: () => void
    data?: any[]
    renderItem?: ListRenderItem<any>
    headerComponent?: any
    style?: StyleProp<ViewStyle>
    numColumns?: number
}

export const ListView = ({data, renderItem, headerComponent, onRefresh, style, numColumns=1}: ListProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            minHeight: "100%",
/*             paddingHorizontal: theme.spacing.primary / 2,
            paddingVertical: theme.spacing.primary */
        },
        itemSeparator: {
            /* height: theme.spacing.primary, */
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
            numColumns={numColumns}
            ListHeaderComponent={headerComponent}
/*             ItemSeparatorComponent={itemSeparator} */
            contentContainerStyle={[styles.container, style]}
            keyboardShouldPersistTaps='always'
            horizontal={true}
            snapToAlignment={'start'}
            viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
            pagingEnabled={true}
            decelerationRate={'fast'}
        />
    )
}