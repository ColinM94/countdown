import * as React from 'react'
import { ImageBackground, StyleSheet } from "react-native"
import { EventDetailsProps } from 'navigation/types'
import { useLoading } from 'contexts/LoadingContext'
import { useTheme } from 'contexts/ThemeContext'
import { useToast } from 'contexts/ToastContext'
import { ScreenView } from 'library/ScreenView'
import { Text } from "library/Text"
import { Card } from 'library/Card'
import { Timer } from 'components/Timer'
import { IconButton } from 'library/IconButton'
import { StatusBar } from 'expo-status-bar'
import { useStore } from 'contexts/StoreContext'
import { db } from 'api/config'
import { useAuth } from 'contexts/AuthContext'
import { EventInfo } from 'common/types'

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const { theme } = useTheme()
    const { showToast } = useToast()
    const { loading } = useLoading()
    const { events } = useStore()
    const { userId } = useAuth()
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
