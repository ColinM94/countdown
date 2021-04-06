import * as React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { FontAwesomeIcon, FontAwesomeIconStyle } from "@fortawesome/react-native-fontawesome"

import { Card, Text, ScreenView, Timer, Button } from "components"
import { EventsProps } from "navigation"
import { getEvents } from "api"
import { useTheme, useToast, useLoading } from "contexts"
import { Event } from "src/common/types"
import { formatDate } from 'common/helpers'

export const EventList = ({ navigation, route }: EventsProps) => {
    const [events, setEvents] = React.useState<Event[] | []>([])

    const { theme } = useTheme()
    const { showToast } = useToast()
    const { loading } = useLoading()

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        loading(true)
        try {
            const events = await getEvents()
            setEvents(events)
        } catch (error) {
            alert(showToast(error.message))
        }
        loading(false)
    }

    const styles = StyleSheet.create({
        itemName: {
            ...theme.typography.h2 as {},
        },
        itemDate: {
            ...theme.typography.subtitle as {}
        },
    })

    const handlePress = (id: string, item: Event) => {
        navigation.navigate("EventDetails", { id: id, event: item })
    }

    const eventItem = ({ item }: { item: Event }) => (
        <Card
            style={{ borderLeftColor: item.color, borderLeftWidth: theme.spacing(), padding: 0 }}
            direction="row"
            onPress={() => handlePress(item.id, item)}
        >
            <View style={{ flexDirection: "column"/* , marginLeft: theme.spacing(0.5) */ }}>
                <Image source={require('../../assets/test.png')} style={{ height: 60, width: 60 }} />
            </View>
            <View style={{ flexDirection: "column", marginLeft: theme.spacing(2) }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDate}>{formatDate(item.date)}</Text>
            </View>
            <View style={{ flexDirection: "column", marginLeft: "auto" }}>
                <FontAwesomeIcon icon="chevron-right" size={24} color={theme.colors.text.secondary} />
            </View>
        </Card>
    )

    return (
        <ScreenView onRefresh={loadData} data={events} renderItem={eventItem}>
            <Card title="No Events Found!" />
        </ScreenView>

    )
}