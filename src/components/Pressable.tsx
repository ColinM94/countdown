import * as React from "react"
import { Pressable as RNPressable, View, StyleSheet } from "react-native"
import { useTheme } from "contexts"

type PressableProps = {
    children?: JSX.Element | JSX.Element[],
    onPress?: () => void,
    style?: {}
}

export const Pressable = ({ children, onPress, style }: PressableProps) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            overflow: "hidden",
            width: "100%",
        },
        pressable: {
            width: "100%",
            ...style
        }
    })

    return (
        <>
            {onPress ?
                <View style={styles.container}>
                    <RNPressable
                        onPress={onPress}
                        style={styles.pressable}
                        android_ripple={{
                            color: "lightgrey",
                        }}
                    >
                        {children}
                    </RNPressable >
                </View>
                :
                <View style={style}>
                    {children}
                </View>
            }
        </>
    )
}

