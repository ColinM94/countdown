import * as React from 'react'
import { StyleSheet, View, Image, Alert, Modal } from 'react-native'
import { EventsProps } from 'navigation/types'
import { useTheme } from 'contexts/ThemeContext'
import { Card } from 'library/Card'
import { ScreenView } from 'library/ScreenView'
import { Text } from "library/Text"
import { EventInfo } from "common/types"
import { deleteEvent } from 'api/firestore'
import { formatDate, formatTime } from 'common/helpers'
import { useAuth } from 'contexts/AuthContext'
import { useStore } from 'contexts/StoreContext'
import { Button } from 'library/Button'
import { ListView } from 'library/ListView'
import { useApp } from 'contexts/AppContext'
import { Timer } from 'components/Timer'
import { Icon } from 'library/Icon'
import { FAB } from 'library/FAB'

export const EventList = ({ navigation, route }: EventsProps) => {
    const { theme } = useTheme()
    const { events } = useStore() 

    const styles = StyleSheet.create({
        container: {
            marginBottom: 0,
            flexDirection: "row",
            alignItems: "center"
        },
        chevron: {
            marginLeft: "auto"
        }
    })

    const eventItem = ({ item }: { item: EventInfo }) => (
        <Card style={styles.container} onPress={() => navigation.navigate("EventDetails", { eventInfo: item })}>
            <View>
                <Text h3>{item.name}</Text>
                <Text subtitle2 >{formatDate(item.date)} @ {formatTime(item.date)}</Text> 
            </View>
            <View style={styles.chevron} >
                <Icon icon="chevron-right"/>
            </View>        
        </Card>
    )   

    return (
        <>
        <ListView data={events} renderItem={eventItem} />
        <FAB onPress={() => navigation.navigate("AddEvent")}/>
        </>
    )
}