import * as React from 'react'
import { ImageBackground, StyleSheet, View, Text } from "react-native"
import { EventDetailsProps } from 'navigation/types'
import { useTheme } from 'contexts/ThemeContext'
import { Timer } from 'components/Timer'
import { useApp } from 'contexts/AppContext'
import { IconButton } from 'library/IconButton'
import { Item, Menu } from 'library/Menu'
import { deleteEvent } from 'api/firestore'
import { useAuth } from 'contexts/AuthContext'
import { EventInfo } from 'common/types'
import Slider from '@react-native-community/slider'
import Constants from 'expo-constants'
import { formatDate } from 'common/helpers'



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

    const styles = StyleSheet.create({
        backgroundImage: {
            flex: 1
        },
        header: {
            marginTop: Constants.statusBarHeight,
            alignItems: "flex-end",
        },
        content: {
            alignItems: "center"
        },
        text: {
            color: "rgba(255,255,255,0.87)"
        },
        name: {
            fontSize: 48
        },
        date: {
            fontSize: 24,
            marginBottom: 16
        },
        number: {
            fontSize: 64,
        },
        letter: {
            fontSize: 28,
            color: "rgba(255,255,255,0.7)"
        },
        slider: {
            marginTop: "auto",
            marginBottom: 20
        }
    })

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
        <>
            <ImageBackground source={require("../../assets/test2.png")} style={styles.backgroundImage}>  
                <View style={{backgroundColor: "rgba(0,0,0,0.25)", flex: 1}}>
                    <View style={styles.header}>
                        <IconButton icon="ellipsis-v" onPress={() => setIsVisible(true)} style={styles.menuBtn}/>
                    </View>
                    <View style={styles.content}>
                        <Text style={[styles.text, styles.name]}>{eventInfo.name}</Text>
                        <Text style={[styles.text, styles.date]}>{formatDate(eventInfo.date)}</Text>
                        <View>           
                            <Timer 
                                date={eventInfo.date} 
                                precision={sliderValue}
                                style={styles.text} 
                                numberStyle={styles.number} 
                                letterStyle={styles.letter}
                            />         
                        </View>
                    </View>
                    <View style={styles.slider}>
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
                </View>         
            </ImageBackground>   
            <Menu isVisible={isVisible} setIsVisible={setIsVisible} items={items} />    
        </>
    )
}
