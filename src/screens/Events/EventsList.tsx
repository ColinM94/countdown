import * as React from "react"
import { StyleSheet, View, FlatList } from "react-native"
import { EventsListItem } from "./EventsListItem"
import { EventInfo } from "common/types"

interface ListProps {
    data: EventInfo[]
}

export const EventsList = ({ data }: ListProps) => {
    const itemSeparator = () => <View style={styles.itemSeparator} />

    const styles = StyleSheet.create({
        itemSeparator: {
            height: 12,
        },
    })

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <EventsListItem eventInfo={item} />}
            ItemSeparatorComponent={itemSeparator}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
        />
    )
}
