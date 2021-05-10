import * as React from "react"
import { EventInfo } from "common/types"
import {
    StyleSheet,
    ImageBackground,
    View,
    ColorValue,
    Text,
    TextInput,
} from "react-native"
import { EventContent } from "./EventContent"
import Constants from "expo-constants"
import { EventHeader } from "./EventHeader"
import { EventFooter } from "./EventFooter"
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

interface EventProps {
    eventInfo: EventInfo
}

export const Event = ({ eventInfo }: EventProps) => {
    const { theme } = useTheme()
    const navigation = useNavigation()

    const [name, setName] = React.useState(eventInfo.name)
    const [date, setDate] = React.useState(eventInfo.date)
    const [image, setImage] = React.useState()
    const [backgroundColor, setBackgroundColor] = React.useState<ColorValue>(
        "rgba(0,0,0,0)"
    )
    const [sliderValue, setSliderValue] = React.useState(1)

    const windowHeight = useWindowDimensions().height

    const [showColorPicker, setShowColorPicker] = React.useState(false)
    const [showImagePicker, setShowImagePicker] = React.useState(false)
    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [showTimePicker, setShowTimePicker] = React.useState(false)
    const [showCustomiseModal, setShowCustomiseModal] = React.useState(false)
    const [showMenu, setShowMenu] = React.useState(false)

    const menuItems: MenuItem[] = [
        {
            text: "Edit",
            leftIcon: "pencil-alt",
            onPress: () => setShowCustomiseModal(true),
        },
        {
            text: "Delete",
            leftIcon: "trash",
            onPress: () => {},
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
            backgroundColor: backgroundColor,
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
        },
        date: {
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
                            icon="ellipsis-v"
                            style={styles.headerMenuBtn}
                            onPress={() => setShowMenu(!showMenu)}
                        />
                    </View>

                    <View style={styles.content}>
                        <TextInput style={styles.name} onChangeText={setName}>
                            {name}
                        </TextInput>
                        <Text style={styles.date}>
                            <Text onPress={() => setShowDatePicker(true)}>
                                {formatDate(date)}
                            </Text>
                            <Text>{" @ "}</Text>
                            <Text onPress={() => setShowTimePicker(true)}>
                                {formatTime(date)}
                            </Text>
                        </Text>
                        <Timer
                            date={date}
                            style={styles.timer}
                            numberStyle={styles.numberStyle}
                            letterStyle={styles.letterStyle}
                            precision={sliderValue}
                        />
                    </View>
                </View>
            </ImageBackground>

            <Modal
                show={showCustomiseModal}
                setShow={setShowCustomiseModal}
                closeOnOutsidePress={false}
                animationType="fade"
            >
                <View style={styles.customiseModal}>
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
                        onPress={() => setShowColorPicker(!showColorPicker)}
                    />
                </View>
                <FAB
                    icon="check"
                    onPress={() => setShowCustomiseModal(false)}
                    color="#2EA043"
                />
                <FAB
                    icon="undo"
                    onPress={() => setShowCustomiseModal(false)}
                    style={{ bottom: 84 }}
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
            </Modal>
            <Menu show={showMenu} setShow={setShowMenu} items={menuItems} />
            <ColorPicker
                show={showColorPicker}
                setShow={setShowColorPicker}
                color={backgroundColor}
                setColor={setBackgroundColor}
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
