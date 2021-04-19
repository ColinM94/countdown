import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useTheme } from "contexts/ThemeContext"
import { MyView } from "./MyView"

type IconButtonProps = {
    icon: IconProp,
    onPress?: () => void,
    color?: string,
    feedbackColor?: string,
    size?: number,
    style?: StyleProp<ViewStyle>
}

export const IconButton = (props: IconButtonProps) => {
    const { theme } = useTheme()

    const {
        icon,
        onPress,
        color = theme.colors.text.primary,
        feedbackColor = theme.colors.accent,
        size = theme.icon.size,
        style
    } = props

    const styles = {
        container: {
            padding: 10,
            borderRadius: 60
        },
    }

    return (
        <MyView onPress={onPress} feedbackColor={feedbackColor} style={[styles.container, style]}>
            <FontAwesomeIcon icon={icon} size={size} color={color} />
        </MyView>
    )
}