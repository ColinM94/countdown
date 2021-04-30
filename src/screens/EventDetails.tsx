import * as React from 'react'
import { ImageBackground, StyleSheet, View } from "react-native"
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
import { StatusBar } from "expo-status-bar"
import Constants from "expo-constants"
import { Text } from "library/Text"
import Slider from '@react-native-community/slider'

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const { theme, isDark } = useTheme()
    const { toast, loading } = useApp()
    const { currentUser } = useAuth()

    const [eventInfo, setEventInfo] = React.useState<EventInfo>(route.params.eventInfo)
    const [isVisible, setIsVisible] = React.useState(false)
    const [isFullScreen, setIsFullScreen] = React.useState(false)
    const [sliderValue, setSliderValue] = React.useState(1)

    React.useEffect(() => {
        setEventInfo(route.params.eventInfo)
    }, [route.params.eventInfo])

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="ellipsis-v" onPress={() => setIsVisible(true)} style={styles.menuBtn}/> 
        })
    })
    const styles = StyleSheet.create({
        name: {
            marginTop: 32
        },
        row: {
            flexDirection: "row",
            width: 125,
            justifyContent: "space-around"
        },
        backgroundImage: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        menuBtn: {
            marginRight: theme.spacing.primary
        },
        slider: {
            alignSelf: "flex-end"

        },
        sliderThumb: {
            backgroundColor: theme.colors.primary,
            borderWidth: 1,
            borderColor: theme.colors.card,
            height: 30,
            width: 30
        },
        sliderTrack: {
            height: 2
        },
        text: {
            textShadowColor: 'rgba(0, 0, 0, 1)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 10,
            textAlign: "center"
        },
        number: {
            fontSize: 58,
        },
        letter: {
            fontSize: 32,
            padding: 10
        },
    })

    const toggleFullScreen = () => {
        navigation.setOptions({
            headerShown: isFullScreen,
        })
        setIsFullScreen(!isFullScreen)
    }

    const handleDelete = async () => {
        loading(true)
        try {
            await deleteEvent(currentUser.id, eventInfo.id)
            navigation.goBack()
        } catch (err) {
            toast(err.message)
        }
        loading(false)
    }

    const items: Item[] = [
        {
            text: "Fullscreen",
            onPress: toggleFullScreen,
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
        <View style={{flex: 1}}>
            <StatusBar hidden={isFullScreen} style={isDark ? "light" : "dark"} />  
            <ImageBackground source={require("../../assets/test2.png")} style={styles.backgroundImage}> 
                <Text h1 style={styles.name}>{eventInfo.name}</Text>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <Timer title={eventInfo.name} date={eventInfo.date} precision={sliderValue} textStyle={styles.text} numberStyle={styles.number} letterStyle={styles.letter}/> 
                </View>
                <View style={{marginTop: "auto", marginBottom: 12, width: "100%"}}>
                    <Slider
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        minimumValue={1}
                        maximumValue={6}
                        step={1}
                        minimumTrackTintColor={theme.colors.primary}
                        maximumTrackTintColor={theme.colors.accent}
                        thumbTintColor={theme.colors.primary}
                    />
                </View>
            </ImageBackground>   
            <Menu isVisible={isVisible} setIsVisible={setIsVisible} items={items} />    
        </View >

    )
}
