import * as React from "react"
import { ColorValue, StyleSheet } from "react-native"
import { Header } from "library/Header"
import { Menu, MenuItem } from "library/Menu"
import { IconButton } from "library/IconButton"
import { useEvent } from "./Event"
import { ColorPicker } from "library/ColorPicker"
import { ImagePicker } from "library/ImagePicker"
import { DateTimePicker } from "library/DateTimePicker"

export const EventHeader = () => {
    const {
        setImage,
        color,
        setColor,
        mode,
        setMode,
        handleDelete,
        date,
        setDate,
    } = useEvent()

    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [showTimePicker, setShowTimePicker] = React.useState(false)
    const [showImagePicker, setShowImagePicker] = React.useState(false)
    const [showColorPicker, setShowColorPicker] = React.useState(false)

    const [showMenu, setShowMenu] = React.useState(false)

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker)
    }

    const toggleTimePicker = () => {
        setShowTimePicker(!showTimePicker)
    }

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker)
    }

    const toggleImagePicker = () => {
        setShowImagePicker(!showImagePicker)
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleSetColor = (color: ColorValue) => {
        setImage(undefined)
        setColor(color)
    }

    const menuItems: MenuItem[] = [
        {
            text: "Edit",
            leftIcon: "pencil-alt",
            onPress: () => setMode("edit"),
        },
        {
            text: "Delete",
            leftIcon: "trash",
            onPress: handleDelete,
        },
    ]

    const styles = StyleSheet.create({
        headerBtn: {
            marginRight: 4,
        },
        menuBtn: {
            marginLeft: "auto",
        },
    })

    const iconBtnColor = "rgba(255,255,255,0.87)"

    return (
        <>
            <Header style={{ alignItems: "center", justifyContent: "center" }}>
                {mode === "edit" || mode === "add" ? (
                    <>
                        <IconButton
                            icon="calendar-alt"
                            style={styles.headerBtn}
                            color={iconBtnColor}
                            onPress={toggleDatePicker}
                        />
                        <IconButton
                            icon="clock"
                            style={styles.headerBtn}
                            color={iconBtnColor}
                            onPress={toggleTimePicker}
                        />
                        <IconButton
                            icon="image"
                            style={styles.headerBtn}
                            color={iconBtnColor}
                            onPress={toggleImagePicker}
                        />
                        <IconButton
                            icon="palette"
                            style={styles.headerBtn}
                            color={iconBtnColor}
                            onPress={toggleColorPicker}
                        />
                    </>
                ) : null}
                {mode === "view" && (
                    <IconButton
                        icon="ellipsis-v"
                        style={styles.menuBtn}
                        color={iconBtnColor}
                        onPress={toggleMenu}
                    />
                )}
            </Header>
            {mode === "edit" || mode === "add" ? (
                <>
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
            ) : null}
            <Menu items={menuItems} show={showMenu} setShow={setShowMenu} />
        </>
    )
}
