import * as React from "react"
import { ColorValue, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Header } from "library/Header"
import { Menu, MenuItem } from "library/Menu"
import { IconButton } from "library/IconButton"
import { EventMode } from "./Event"
import { ColorPicker } from "library/ColorPicker"
import { ImagePicker } from "library/ImagePicker"
import { FAB } from "library/FAB"

interface EventHeaderProps {
    mode: EventMode
    setMode: (mode: EventMode) => void
    color: ColorValue
    setColor: (color: ColorValue) => void
    image: any
    setImage: (image: any) => void
}

export const EventHeader = (props: EventHeaderProps) => {
    const navigation = useNavigation()

    const { mode, setMode, color, setColor, image, setImage } = props

    const [showImagePicker, setShowImagePicker] = React.useState(false)
    const [showColorPicker, setShowColorPicker] = React.useState(false)
    const [showMenu, setShowMenu] = React.useState(false)

    const menuItems: MenuItem[] = [
        {
            text: "Edit",
            leftIcon: "pencil-alt",
            onPress: () => setMode("edit"),
        },
    ]

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker)
    }

    const toggleImagePicker = () => {
        setShowImagePicker(!showImagePicker)
    }

    const handleSetColor = (color: ColorValue) => {
        setImage(undefined)
        setColor(color)
    }

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
            <Header>
                {mode === "edit" && (
                    <>
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
                )}
                <IconButton
                    icon="ellipsis-v"
                    style={styles.menuBtn}
                    color={iconBtnColor}
                    onPress={toggleMenu}
                />
            </Header>
            <Menu items={menuItems} show={showMenu} setShow={setShowMenu} />
            {mode === "edit" && (
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
                </>
            )}
        </>
    )
}
