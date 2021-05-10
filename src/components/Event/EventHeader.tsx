import * as React from "react"
import { EventInfo } from "common/types"
import { StyleSheet, View, Text, ColorValue } from "react-native"
import Constants from "expo-constants"
import { ImagePicker } from "library/ImagePicker"
import { IconButton } from "library/IconButton"
import { ColorPicker } from "library/ColorPicker"
import { useTheme } from "contexts/ThemeContext"
import { DateTimePicker } from "library/DateTimePicker"

interface EventHeaderProps {
    setImage: (image: any) => void
    color: ColorValue
    setColor: (color: ColorValue) => void
    date: Date
    setDate: (date: Date) => void
}

export const EventHeader = (props: EventHeaderProps) => {
    const { theme } = useTheme()
    const { setImage, color, setColor, date, setDate } = props

    const [showColorPicker, setShowColorPicker] = React.useState(false)
    const [showImagePicker, setShowImagePicker] = React.useState(false)
    const [showDatePicker, setShowDatePicker] = React.useState(false)

    const styles = StyleSheet.create({
        container: {
            marginTop: Constants.statusBarHeight,
            flexDirection: "row",
        },
        imageBtn: {
            marginRight: theme.spacing.primary,
        },
        paletteBtn: {
            marginRight: theme.spacing.primary,
        },
        calendarBtn: {
            marginRight: theme.spacing.primary,
        },
    })

    return (
        <>
            <View style={styles.container}>
                <IconButton
                    icon="image"
                    style={styles.imageBtn}
                    onPress={() => setShowImagePicker(!showImagePicker)}
                />
                <IconButton
                    icon="palette"
                    style={styles.paletteBtn}
                    onPress={() => setShowColorPicker(!showColorPicker)}
                />
                <IconButton
                    icon="calendar-alt"
                    style={styles.calendarBtn}
                    onPress={() => setShowDatePicker(!showDatePicker)}
                />
                <IconButton
                    icon="pencil-alt"
                    style={styles.calendarBtn}
                    onPress={() => setShowColorPicker(!showColorPicker)}
                />
            </View>
            <ColorPicker
                show={showColorPicker}
                setShow={setShowColorPicker}
                color={color}
                setColor={setColor}
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
            />
        </>
    )
}
