import * as React from 'react'
import { FlatList, RefreshControl, View } from 'react-native'

import { Card, Button, Text, ScreenView } from "components"
import { EventsProps, Navigation } from "navigation"
import { getEvents, deleteEvent } from "api"
import { useTheme, useToast, useLoading } from "contexts"
import { Event } from "src/common/types"
import { formatDate, formatTime, timeSince } from 'common/helpers'
import { db } from "api/firebase"

export const EventList = ({ navigation, route }: EventsProps) => {
    const [events, setEvents] = React.useState<Event[] | []>([])
    const [refreshing, setRefreshing] = React.useState(false);

    const { theme } = useTheme()
    const { showToast } = useToast()
    const { startLoading, endLoading } = useLoading()

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        startLoading()
        try {
            const events = await getEvents()
            setEvents(events)
        } catch (error) {
            alert(showToast(error.message))
        }
        endLoading()
    }

    const eventItem = ({ item }: { item: Event }) => (
        <Card color={item.color} onPress={() => navigation.navigate("EventDetails", { id: item.id, event: item })}>
            <Text style={{ marginBottom: theme.spacing }}>{item.name}</Text>
            <Text style={{ marginBottom: theme.spacing }}>{`Original Date: ${formatDate(item.date)} @ ${formatTime(item.date)}`}</Text>
            <Text style={{ marginBottom: theme.spacing }}>{`Time Since: ${timeSince(item.date)}`}</Text>
        </Card>
    )

    return (
        <>
            {events.length < 1
                ?
                <ScreenView onRefresh={loadData}>
                    <Card title="No Events Found!" />
                </ScreenView>
                :
                <View style={{ padding: theme.spacing / 2 }}>
                    <FlatList
                        data={events}
                        renderItem={eventItem}
                        keyExtractor={item => item.id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={loadData}
                            />
                        }
                        style={{ minHeight: "100%" }}
                    />
                </View>
            }
        </>
    )
}