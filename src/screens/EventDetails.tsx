import * as React from 'react'
import { ImageBackground, Modal, StyleSheet, View } from "react-native"
import { EventDetailsProps } from 'navigation/types'
import { useTheme } from 'contexts/ThemeContext'
import { ScreenView } from 'library/ScreenView'
import { Timer } from 'components/Timer'
import { StatusBar } from 'expo-status-bar'
import { useStore } from 'contexts/StoreContext'
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
    const { events } = useStore()

    const [id, setId] = React.useState()
    const [name, setName] = React.useState(route.params.event.name)
    const [date, setDate] = React.useState(route.params.event.date)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isFullScreen, setIsFullScreen] = React.useState(false)

    React.useEffect(() => {
        setId(route.params.event.id)
        setName(route.params.event.name)
        setDate(route.params.event.date)
    }, [route.params.event])

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

    const handleDelete = async () => {
        try {
            await deleteEvent(currentUser.id, id)
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
            onPress: () => navigation.navigate("EditEvent", {event: route.params.event}),
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
            <StatusBar translucent={false} backgroundColor={theme.colors.primary} hidden={isFullScreen} style={"light"}/> 
            <ImageBackground source={require("../../assets/test2.png")} style={styles.backgroundImage}> 
                <IconButton icon="ellipsis-v" onPress={() => setIsVisible(true)} style={{margin: 4, marginLeft: "auto"}}/>
                <Timer title={name} date={date} style={{marginTop: "45%"}}/> 
            </ImageBackground>     
            <Menu isVisible={isVisible} setIsVisible={setIsVisible} items={items} /> 
        </ScreenView >

    )
}
