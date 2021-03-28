import * as React from 'react'
import { FlatList } from 'react-native'
import { Card, ScreenView, Button, Text } from "components"
import { EventsProps } from "navigation"
import { getEvents, deleteEvent } from "api/firestore"
import { useTheme, useToast } from "contexts"
import { Event } from "src/common/types"

export const Events = ({ }: EventsProps) => {
    const [events, setEvents] = React.useState<Event[] | []>([])
    const { theme } = useTheme()
    const { showToast } = useToast()

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getEvents()
            .then(events => {
                setEvents(events)
            }).catch(error => {
                alert(error.message)
            })
    }

    const deleteFromDB = (id: string) => {
        deleteEvent(id).then(() => {
            showToast("Event Deleted")
            loadData()
        })
    }

    const eventItem = ({ item }: any) => (
        <Card>
            {/*             <Text style={{ color: theme.colors.text, marginBottom: theme.spacing }}>{item.name}</Text> */}
            <Button title="Delete" onPress={() => deleteFromDB(item.id)} />
        </Card>
    )

    return (
        <ScreenView onRefresh={loadData}>
            <>
                {events.length < 1 &&
                    <Card>
                        <Text>No Events Found!</Text>
                    </Card>
                }
            </>
            <FlatList
                data={events}
                renderItem={eventItem}
                keyExtractor={item => item.id}
            />
        </ScreenView>
    )
}