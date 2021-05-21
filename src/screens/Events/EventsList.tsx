import * as React from "react"
import { StyleSheet, View, FlatList } from "react-native"
import { EventsListItem } from "./EventsListItem"
import { EventInfo } from "common/types"
import { useTheme } from "contexts/ThemeContext"

interface ListProps {
    data: EventInfo[]
}

export const EventsList = ({ data }: ListProps) => {
    const { theme } = useTheme()
    const itemSeparator = () => <View style={styles.itemSeparator} />

    const styles = StyleSheet.create({
        list: {
            padding: theme.spacing.primary,
        },
        itemSeparator: {
            height: 12,
        },
    })

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <EventsListItem eventInfo={item} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={itemSeparator}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={styles.list}
        />
    )
}
