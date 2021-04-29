import * as React from 'react'
import { ImageBackground, StyleSheet, StatusBar } from "react-native"
import { EventDetailsProps } from 'navigation/types'
import { useTheme } from 'contexts/ThemeContext'
import { ScreenView } from 'library/ScreenView'
import { Timer } from 'components/Timer'
import { useApp } from 'contexts/AppContext'
import { IconButton } from 'library/IconButton'
import { Item, Menu } from 'library/Menu'
import { deleteEvent } from 'api/firestore'
import { useAuth } from 'contexts/AuthContext'
import { EventInfo } from 'common/types'

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const { theme } = useTheme()
    const { toast } = useApp()
    const { currentUser } = useAuth()

    const [eventInfo, setEventInfo] = React.useState<EventInfo>(route.params.eventInfo)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isFullScreen, setIsFullScreen] = React.useState(false)

    React.useEffect(() => {
        setEventInfo(route.params.eventInfo)
    }, [route.params.eventInfo])

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
        },
        menuBtn: {
            position: "absolute",
            right: 4,
            margin: 4,
            marginTop: isFullScreen ? theme.spacing.primary : StatusBar.currentHeight + 4, 
            marginLeft: "auto"
        }
    })

    const handleDelete = async () => {
        try {
            await deleteEvent(currentUser.id, eventInfo.id)
            navigation.goBack()
        } catch (err) {
            toast(err.message)
        }
    }

    const items: Item[] = [
        {
            text: "Fullscreen",
            onPress: () => setIsFullScreen(!isFullScreen),
            leftIcon: isFullScreen ? "compress-arrows-alt" : "expand-arrows-alt"
        },
        {
            text: "Edit",
            onPress: () => navigation.navigate("EditEvent", {eventInfo: route.params.eventInfo}),
            leftIcon: "pencil-alt",
        },
        {
            text: "Delete",
            onPress: handleDelete,
            leftIcon: "trash",
        },
    ]

    return (
        <ScreenView style={{padding: 0}}>
            <StatusBar hidden={isFullScreen} />  
            <ImageBackground source={require("../../assets/test2.png")} style={styles.backgroundImage}> 
                <IconButton icon="ellipsis-v" onPress={() => setIsVisible(true)} style={styles.menuBtn}/>
                <Timer title={eventInfo.name} date={eventInfo.date} style={{marginTop: "45%"}}/> 
            </ImageBackground>     
            <Menu isVisible={isVisible} setIsVisible={setIsVisible} items={items} /> 
        </ScreenView >

    )
}
