import * as React from "react"
import { ColorValue, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Header } from "library/Header"
import { Menu, MenuItem } from "library/Menu"
import { IconButton } from "library/IconButton"
import { useEvent } from "./Event"
import { ColorPicker } from "library/ColorPicker"
import { ImagePicker } from "library/ImagePicker"
import { deleteEvent } from "api/firestore"
import { useAuth } from "contexts/AuthContext"
import { useToast } from "contexts/ToastContext"

export const EventHeader = () => {
    const navigation = useNavigation()
    const { currentUser } = useAuth()
    const { toast } = useToast()
    const { setImage, color, setColor, mode, setMode, id } = useEvent()

    const [showImagePicker, setShowImagePicker] = React.useState(false)
    const [showColorPicker, setShowColorPicker] = React.useState(false)
    const [showMenu, setShowMenu] = React.useState(false)

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

    const handleDelete = async () => {
        try {
            await deleteEvent(currentUser.id!, id!)
            toast("deleted")
            navigation.navigate("Events")
        } catch (err) {
            toast(err.message)
        }
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
            <Header>
                {mode === "edit" || mode === "add" ? (
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
            <Menu items={menuItems} show={showMenu} setShow={setShowMenu} />
        </>
    )
}
