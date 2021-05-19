import * as React from "react"
import { EventInfo } from "common/types"
import {
    StyleSheet,
    ImageBackground,
    View,
    ColorValue,
    Text,
    TextInput,
    Keyboard,
} from "react-native"
import Constants from "expo-constants"
import { useTheme } from "contexts/ThemeContext"
import { ColorPicker } from "library/ColorPicker"
import { ImagePicker } from "library/ImagePicker"
import { DateTimePicker } from "library/DateTimePicker"
import { IconButton } from "library/IconButton"
import { formatDate, formatTime } from "common/helpers"
import { Timer } from "./Timer"
import { FAB } from "library/FAB"
import { Modal } from "library/Modal"
import { Menu, MenuItem } from "library/Menu"
import { useNavigation } from "@react-navigation/native"
import Slider from "@react-native-community/slider"
import { useWindowDimensions } from "react-native"
import { addEvent, deleteEvent, updateEvent } from "api/firestore"
import { useAuth } from "contexts/AuthContext"
import { useApp } from "contexts/AppContext"

interface EventProps {
    eventInfo?: EventInfo
}

export const Event = ({ eventInfo }: EventProps) => {
    const { theme } = useTheme()
    const { currentUser } = useAuth()
    const { toast, loading } = useApp()
    const navigation = useNavigation()
    var nameTextInput: TextInput = React.createRef()

    const [name, setName] = React.useState(eventInfo?.name ?? "")
    const [date, setDate] = React.useState(eventInfo?.date ?? undefined)
    const [image, setImage] = React.useState()
    const [color, setColor] = React.useState<ColorValue>(
        eventInfo?.color ?? theme.colors.card
    )
    const [sliderValue, setSliderValue] = React.useState(1)

    const [showColorPicker, setShowColorPicker] = React.useState(false)
    const [showImagePicker, setShowImagePicker] = React.useState(false)
    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [showTimePicker, setShowTimePicker] = React.useState(false)
    const [showCustomiseModal, setShowCustomiseModal] = React.useState(
        !eventInfo
    )
    const [showMenu, setShowMenu] = React.useState(false)

    const windowHeight = useWindowDimensions().height

    const handleSave = async () => {
        loading(true)
        setShowCustomiseModal(false)
        try {
            if (!eventInfo) {
                await addEvent(currentUser.id, { name, date, color })
                navigation.navigate("EventList")
                toast("Event Created")
            } else {
                await updateEvent(currentUser.id, {
                    id: eventInfo.id,
                    name,
                    date,
                    color,
                })
                toast("Saved")
            }
        } catch (err) {
            toast(err.message)
        }
        loading(false)
    }

    const handleDelete = async () => {
        loading(true)

        try {
            await deleteEvent(currentUser.id, eventInfo.id)
            navigation.navigate("EventList")
        } catch (err) {
            toast(err.message)
        }

        loading(false)
    }

    const handleSetColor = (color: ColorValue) => {
        setImage(undefined)
        setColor(color)
    }

    const menuItems: MenuItem[] = [
        {
            text: "Edit",
            leftIcon: "pencil-alt",
            onPress: () => setShowCustomiseModal(true),
        },
        {
            text: "Delete",
            leftIcon: "trash",
            onPress: handleDelete,
            divider: true,
        },
        {
            text: "Settings",
            leftIcon: "cog",
            onPress: () => {
                navigation.navigate("Settings")
            },
        },
    ]

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            backgroundColor: color,
            height: windowHeight,
        },
        backgroundOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.25)",
            padding: theme.spacing.primary,
        },
        header: {
            marginTop: Constants.statusBarHeight,
            flexDirection: "row",
        },
        headerMenuBtn: {
            marginLeft: "auto",
        },
        headerBtn: {
            marginLeft: theme.spacing.primary,
        },
        headerDeleteBtn: {
            marginLeft: "auto",
        },
        content: {
            flex: 1,
            alignItems: "center",
        },
        name: {
            fontSize: 36,
            color: "rgba(255,255,255,0.87)",
            marginBottom: theme.spacing.primary,
        },
        date: {
            fontSize: 24,
            color: "rgba(255,255,255,0.64)",
        },
        time: {
            fontSize: 24,
            color: "rgba(255,255,255,0.64)",
        },
        timer: {
            marginTop: "auto",
            marginRight: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
        },
        numberStyle: {
            fontSize: 56,
            color: "rgba(255,255,255,0.87)",
            padding: 10,
        },
        letterStyle: {
            fontSize: 28,
            color: "rgba(255,255,255,0.64)",
        },
        footer: {
            flexDirection: "row",
        },
        customiseModal: {
            flexDirection: "row",
            padding: theme.spacing.primary,
            position: "absolute",
            right: 0,
            left: 0,
            top: 0,
        },
        sliderContainer: {
            position: "absolute",
            bottom: 24,
            left: 0,
            right: 90,
        },
    })

    return (
        <>
            <ImageBackground source={{ uri: image }} style={styles.background}>
                <View style={styles.backgroundOverlay}>
                    <View style={styles.header}>
                        <IconButton
                            icon="image"
                            onPress={() => setShowImagePicker(!showImagePicker)}
                        />
                        <IconButton
                            icon="palette"
                            style={styles.headerBtn}
                            onPress={() => setShowColorPicker(!showColorPicker)}
                        />
                        <IconButton
                            icon="calendar-alt"
                            style={styles.headerBtn}
                            onPress={() => setShowDatePicker(!showDatePicker)}
                        />
                        <IconButton
                            icon="clock"
                            style={styles.headerBtn}
                            onPress={() => setShowTimePicker(!showTimePicker)}
                        />
                        <IconButton
                            icon="pencil-alt"
                            style={styles.headerBtn}
                            onPress={() => {
                                nameTextInput.focus()
                            }}
                        />
                        <IconButton
                            icon="ellipsis-v"
                            style={styles.headerMenuBtn}
                            onPress={() => setShowMenu(!showMenu)}
                        />
                    </View>

                    <View style={styles.content}>
                        <TextInput
                            style={styles.name}
                            onChangeText={setName}
                            placeholder="Event Name"
                            placeholderTextColor={styles.name.color}
                            ref={(ref) => {
                                nameTextInput = ref
                            }}
                        >
                            {name}
                        </TextInput>
                        <Text
                            style={styles.date}
                            onPress={() => setShowDatePicker(true)}
                        >
                            {date ? formatDate(date) : "Date"}
                        </Text>
                        <Text
                            style={styles.time}
                            onPress={() => setShowTimePicker(true)}
                        >
                            {date ? formatTime(date) : "Time"}
                        </Text>
                        <Timer
                            date={date}
                            style={styles.timer}
                            numberStyle={styles.numberStyle}
                            letterStyle={styles.letterStyle}
                            precision={sliderValue}
                        />
                        <View style={styles.sliderContainer}>
                            <Slider
                                value={sliderValue}
                                minimumValue={0}
                                maximumValue={6}
                                step={1}
                                minimumTrackTintColor={theme.colors.primary}
                                maximumTrackTintColor="#FFFFFF"
                                onValueChange={setSliderValue}
                                thumbTintColor={theme.colors.primary}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <View style={styles.customiseModal}></View>
            <FAB icon="check" onPress={handleSave} color="#2EA043" />
            <FAB
                icon="undo"
                onPress={() => setShowCustomiseModal(false)}
                style={{ bottom: 84 }}
            />

            <Menu show={showMenu} setShow={setShowMenu} items={menuItems} />
            <ColorPicker
                show={showColorPicker}
                setShow={setShowColorPicker}
                color={color}
                setColor={handleSetColor}
            />
            <ImagePicker
                setImage={setImage}
                show={showImagePicker}
                setShow={setShowImagePicker}
            />
            <DateTimePicker
                date={date}
                setDate={setDate}
                show={showDatePicker}
                setShow={setShowDatePicker}
                mode="date"
            />
            <DateTimePicker
                date={date}
                setDate={setDate}
                show={showTimePicker}
                setShow={setShowTimePicker}
                mode="time"
            />
        </>
    )
}
