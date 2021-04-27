import * as React from 'react'
import { StyleSheet, View, Image, Alert, Modal } from 'react-native'
import { EventsProps } from 'navigation/types'
import { useTheme } from 'contexts/ThemeContext'
import { Card } from 'library/Card'
import { ScreenView } from 'library/ScreenView'
import { Text } from "library/Text"
import { EventInfo } from "common/types"
import { deleteEvent } from 'api/firestore'
import { formatDate } from 'common/helpers'
import { useAuth } from 'contexts/AuthContext'
import { useStore } from 'contexts/StoreContext'
import { Button } from 'library/Button'
import { ListView } from 'library/ListView'
import { useApp } from 'contexts/AppContext'
import { Timer } from 'components/Timer'

export const EventList = ({ navigation, route }: EventsProps) => {
    const { theme } = useTheme()
    const { events } = useStore() 

    const styles = StyleSheet.create({
        container: {
            marginBottom: 0
        },
        modal: {
            marginLeft: "auto", 
            marginRight: "auto", 
            marginTop: "40%", 
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: theme.colors.card, 
            borderRadius: theme.roundness,
            borderColor: theme.colors.accent,
            borderWidth: 1,
            padding: 24
        }
    })

    const eventItem = ({ item }: { item: EventInfo }) => (
        <Card style={styles.container} onPress={() => navigation.navigate("EventDetails", { event: item })}>
            <View>
                <Text h3>{item.name}</Text>
                <Text subtitle2 >{formatDate(item.date)}</Text> 
            </View>
        </Card>
    )   

    return (
        <ListView data={events} renderItem={eventItem} />
    )
}