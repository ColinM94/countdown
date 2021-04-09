import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon, FontAwesomeIconStyle } from "@fortawesome/react-native-fontawesome"
import { useTheme } from "contexts"
import * as React from "react"
import { StyleProp } from "react-native"
import { View, Pressable, StyleSheet, ViewStyle } from "react-native"

interface IconButtonProps {
    onPress?: () => void,
    icon: IconProp,
    style?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>
    iconStyle?: StyleProp<FontAwesomeIconStyle>
    iconSize?: number
}

export const IconButton = ({ onPress, icon, style, containerStyle, iconStyle, iconSize = 23 }: IconButtonProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            overflow: "hidden",
            borderRadius: 80,
            ...containerStyle as {}
        },
        pressable: {
            padding: theme.spacing(),
            ...style as {}
        },
        icon: {
            color: theme.colors.text.primary,
            ...iconStyle as {}
        }
    })

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.pressable}
                onPress={onPress}
                android_ripple={{
                    color: "lightgrey",
                }}
            >
                <FontAwesomeIcon icon={icon} size={iconSize} style={styles.icon} />
            </Pressable>
        </View>
    )
}