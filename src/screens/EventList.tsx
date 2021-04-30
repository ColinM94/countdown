import * as React from 'react'
import { StyleSheet, View, Image, Alert, Modal, ImageBackground} from 'react-native'
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
import { Pressable } from "library/Pressable"
import { useWindowDimensions } from 'react-native';
import { EventDetails } from './EventDetails'


export const EventList = ({ navigation, route }: EventsProps) => {
    const { theme } = useTheme()
    const { events } = useStore() 

    const window = useWindowDimensions()

    const styles = StyleSheet.create({
        container: {
         /*    marginHorizontal: theme.spacing.primary / 2, */
            flex: 1,
            width: window.width
        },
        leftContent: {
            
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
        <EventDetails eventInfo={item} style={{flex: 1, width: window.width}}/>

/*         <Pressable onPress={() => navigation.navigate("EventDetails", { eventInfo: item })} style={styles.container} >
            <ImageBackground source={require("../../assets/test2.png")} style={{flex: 1, width: "100%", alignItems: "center"}}> 
                <Text h3>{item.name}</Text>
                <Text subtitle>{formatDate(item.date)}</Text>
                    <Timer date={item.date} style={styles.timerStyle} textStyle={styles.timerTextStyle} numberStyle={styles.timerNumberStyle} letterStyle={styles.timerLetterStyle} fullText={true} />  
            </ImageBackground>
        </Pressable> */  
    )   

    return (
        <>
            <ListView data={events} renderItem={eventItem}/>
         {/*    <FAB onPress={() => navigation.navigate("AddEvent")}/> */}
        </>
    )
}