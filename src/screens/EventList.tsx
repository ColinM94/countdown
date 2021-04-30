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
            flexDirection: "row",
            marginBottom: 0
        },
        leftContent: {
            marginRight: 24
        },
        chevron: {
            marginLeft: "auto"
        },
        timerStyle: {

        },
        timerTextStyle: {


        },
        timerNumberStyle: {
            
        },
        timerLetterStyle: {
        
        }
    })

    const eventItem = ({ item }: { item: EventInfo }) => (
        <Card style={styles.container} onPress={() => navigation.navigate("EventDetails", { eventInfo: item })}>
            <View style={styles.leftContent}>
                <Text h3>{item.name}</Text>
                <Text subtitle>{formatDate(item.date)}</Text>
            </View>
{/*             <Text adjustsFontSizeToFit>
                <Timer date={item.date} style={styles.timerStyle} textStyle={styles.timerTextStyle} numberStyle={styles.timerNumberStyle} letterStyle={styles.timerLetterStyle} />  
            </Text> */}
        </Card>
    )   

    return (
        <>
            <ListView data={events} renderItem={eventItem} />
            <FAB onPress={() => navigation.navigate("AddEvent")}/>
        </>
    )
}