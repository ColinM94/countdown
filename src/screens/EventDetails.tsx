import * as React from 'react'
import { ImageBackground, StyleSheet } from "react-native"
import { EventDetailsProps } from 'navigation/types'
import { useTheme } from 'contexts/ThemeContext'
import { ScreenView } from 'library/ScreenView'
import { Timer } from 'components/Timer'
import { StatusBar } from 'expo-status-bar'
import { useStore } from 'contexts/StoreContext'
import { useApp } from 'contexts/AppContext'

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const { theme } = useTheme()
    const { toast, loading } = useApp()
    const { events } = useStore()
    const [eventInfo, setEventInfo] = React.useState(route.params.item)

    const styles = StyleSheet.create({
        text: {
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 20,
        },
        number: {

        },
        letter: {

        },
        name: {
            marginVertical: theme.spacing.primary
        },
        row: {
            flexDirection: "row",
            width: 125,
            justifyContent: "space-around"
        },
        backgroundImage: {
            flex: 1,
        }
    })

    return (
        <ScreenView style={{padding: 0}}>
            <StatusBar hidden={true}/>
            <ImageBackground source={require("../../assets/test2.png")} style={styles.backgroundImage}> 
                <Timer title={eventInfo.name} date={eventInfo.date} style={{marginTop: "45%"}}/> 
            </ImageBackground>  
        </ScreenView >
    )
}
