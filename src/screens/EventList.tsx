import * as React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EventsProps } from 'navigation/types'
import { useTheme } from 'contexts/ThemeContext'
import { useToast } from 'contexts/ToastContext'
import { useLoading } from 'contexts/LoadingContext'
import { Card } from 'library/Card'
import { ScreenView } from 'library/ScreenView'
import { Text } from "library/Text"
import { Event } from "common/types"
import { getEvents } from 'api/firestore'
import { formatDate } from 'common/helpers'

export const EventList = ({ navigation, route }: EventsProps) => {
    const [events, setEvents] = React.useState<Event[]>()
    const { theme } = useTheme()
    const { showToast } = useToast()
    const { loading } = useLoading()

    const styles = StyleSheet.create({
        itemName: {
            ...theme.typography.h3 as {},
        },
        itemDate: {
            ...theme.typography.subtitle as {}
        },
    })

    const eventItem = ({ item }: { item: Event }) => (
        <Card 
            direction="row" 
            style={{marginBottom: 0}}
            onPress={() => navigation.navigate("EventDetails", item)} 
        >
            <View>
                <Text h3>{item.name}</Text>
                <Text subtitle2>{formatDate(item.date)}</Text>
            </View>
        </Card>
    )   

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        let data = await getEvents()
        setEvents(data)
    }

    return (
        <ScreenView data={events} renderItem={eventItem}>

        </ScreenView>


/*         <ScreenView>
            <Card>
                <Text overline>Overline</Text>
                <Text h1>Heading 1</Text>
                <Text body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
            </Card>
        </ScreenView> */
       

    )
}