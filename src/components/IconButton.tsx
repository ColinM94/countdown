import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useTheme } from "contexts"
import * as React from "react"
import { StyleProp } from "react-native"
import { View, Pressable, StyleSheet, ViewStyle } from "react-native"

interface IconButtonProps {
    onPress?: () => void,
    icon: IconProp,
    style?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>
    iconStyle?: StyleProp<ViewStyle>
    iconSize?: number
}

export const IconButton = ({ onPress, icon, style, containerStyle, iconStyle, iconSize = 22 }: IconButtonProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            overflow: "hidden",
            borderRadius: 60,
            ...containerStyle as {}
        },
        pressable: {
            padding: 10,
            ...style as {}
        },
        icon: {
            ...theme.icon as {},
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