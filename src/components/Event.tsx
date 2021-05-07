import * as React from 'react'
import { ImageBackground, StyleSheet, View, Text, TextInput, ColorValue } from "react-native"
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
import { ImagePicker } from 'library/ImagePicker'
import { useNavigation } from '@react-navigation/native'
import { DateTimePicker } from 'library/DateTimePicker'
import { FAB } from 'library/FAB'
import { LinearGradient } from 'expo-linear-gradient';
import { ColorPicker } from 'library/ColorPicker'

interface EventProps {
    eventInfo?: EventInfo
}

export const Event = ({eventInfo}: EventProps) => {
    const { theme, isDark } = useTheme()
    const { toast, loading } = useApp()
    const { currentUser } = useAuth()
    const navigation = useNavigation()

    const [isVisible, setIsVisible] = React.useState(false)
    const [sliderValue, setSliderValue] = React.useState(1)
    const [image, setImage] = React.useState()
    const [showColorPicker, setShowColorPicker] = React.useState(false)

    const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false)
    const [name, setName] = React.useState(eventInfo?.name ?? "")
    const [date, setDate] = React.useState<Date | undefined>(eventInfo?.date ?? undefined)
    const [isEditMode, setIsEditMode] = React.useState(!eventInfo)
    const [backgroundColor, setBackgroundColor] = React.useState<ColorValue>("red")

    const items: Item[] = [
        {
            text: "Edit",
            onPress: () => enableEditMode(),
            leftIcon: "pencil-alt",
        },
        {
            text: "Delete",
            onPress: () => handleDelete(),
            leftIcon: "trash",
        },
    ]

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

    const enableEditMode = () => {
        setIsEditMode(true)
    }

    const disableEditMode = () => {
        setIsEditMode(false)
    }

    const saveChanges = () => {
        
    }

    const styles = StyleSheet.create({
        backgroundImage: {
            flex: 1,
            backgroundColor: backgroundColor
        },
        header: {
            marginTop: Constants.statusBarHeight,
            padding: theme.spacing.primary,
            flexDirection: "row"
        },
        imagePickerBtn: {
            
        },
        paletteBtn: {
            marginLeft: theme.spacing.primary
        },
        menuBtn: {
            marginLeft: "auto"
        },
        content: {
            flex: 1,
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
            marginBottom: 24,
            color: "rgba(255,255,255,0.87)"
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
        },
        nameInput: {
            color: "white", 
            fontSize: 32, 
            padding: theme.spacing.primary, 
            textAlign: "center"
        }
    })

    return (
        <>
            <ImageBackground source={{ uri: image}} style={styles.backgroundImage} >  
                <View style={{backgroundColor: "rgba(0,0,0,0.3)", flex: 1}}>
                    <View style={styles.header}>
                        {isEditMode && <ImagePicker setImage={setImage} style={styles.imagePickerBtn} />}
                        {isEditMode && <IconButton icon="palette" style={styles.paletteBtn} onPress={() => setShowColorPicker(!showColorPicker)}/>}
                        <IconButton icon="ellipsis-v" onPress={() => setIsVisible(true)} style={styles.menuBtn}/> 
                    </View>
                    <View style={styles.content}>
                        <TextInput 
                            value={name} 
                            onChangeText={setName} 
                            placeholder="Event Name" 
                            placeholderTextColor={theme.colors.text.secondary} 
                            style={styles.nameInput}
                            editable={isEditMode}
                        />
                        <Text onPress={isEditMode ? () => setIsDatePickerVisible(true) : undefined} style={styles.date}>
                            {date ? formatDate(date) : "Select a Date"}
                        </Text>
                        { date &&
                            <Timer 
                                date={date} 
                                precision={sliderValue}
                                style={styles.text} 
                                numberStyle={styles.number} 
                                letterStyle={styles.letter}
                            />                            
                        }
                       
                    </View>
                    { date &&
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
                    }
                </View>         
            </ImageBackground> 
            <Menu isVisible={isVisible} setIsVisible={setIsVisible} items={items} />    
            <DateTimePicker 
                date={date} 
                setDate={setDate} 
                isVisible={isDatePickerVisible}
                setIsVisible={setIsDatePickerVisible}
            />
            <ColorPicker show={showColorPicker} setShow={setShowColorPicker} color={backgroundColor} setColor={setBackgroundColor}/>
            <FAB icon="check" onPress={saveChanges}/>
        </>
    )
}
