import { Menu } from "library/Menu"
import * as React from "react"
import { View } from "react-native"

interface EventHeaderProps {
    isEditMode: boolean
    setIsEditMode: (isEditMode: boolean) => void
}

export const EventHeader = ({
    isEditMode,
    setIsEditMode,
}: EventHeaderProps) => {
    const [isMenuVisible, setIsMenuVisible] = React.useState(false)

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

    return (
        <>
            <View></View>
            <Menu
                isVisible={isMenuVisible}
                setIsVisible={setIsMenuVisible}
                items={items}
            />
            <ColorPicker
                show={showColorPicker}
                setShow={setShowColorPicker}
                color={backgroundColor}
                setColor={setBackgroundColor}
            />
        </>
    )
}
