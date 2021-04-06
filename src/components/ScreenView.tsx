import * as React from "react"
import { View, ScrollView, StyleSheet, RefreshControl, FlatList, ListRenderItem } from "react-native"
import { useTheme } from "contexts"
import { Event } from "common/types"

type Props = {
    children?: JSX.Element | JSX.Element[],
    onRefresh?: () => void,
    data?: Event[],
    renderItem?: ListRenderItem<Event>
}

export const ScreenView = ({ children, onRefresh, data, renderItem }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            minHeight: "100%",
            padding: theme.spacing("outer")
        },
        itemSeparator: {
            height: theme.spacing("outer")
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
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onRefresh}
                        />
                    }
                    ItemSeparatorComponent={itemSeparator}
                    style={styles.container}
                />
                :
                <ScrollView
                    contentContainerStyle={styles.container}
                    refreshControl={
                        // Enables refresh functionality if a function has been passed in as onRefresh.  
                        <RefreshControl onRefresh={onRefresh} refreshing={false} enabled={onRefresh != undefined} />
                    }
                >
                    {children}
                </ScrollView>}
        </>
    )
}
