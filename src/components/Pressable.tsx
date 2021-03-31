import * as React from "react"
import { Pressable as RNPressable, View } from "react-native"
import { useTheme } from "contexts"

type PressableProps = {
    children?: JSX.Element | JSX.Element[],
    onPress?: () => void,
    style?: {}
}

export const Pressable = ({ children, onPress, style }: PressableProps) => {
    const { theme } = useTheme()

    return (
        <>
            {onPress ?
                <RNPressable
                    onPress={onPress}
                    style={style}
                    android_ripple={{
                        color: "lightgrey",
                    }}
                >
                    {children}
                </RNPressable >
                :
                <View style={style}>
                    {children}
                </View>
            }
        </>
    )
}

