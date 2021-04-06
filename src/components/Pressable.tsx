import * as React from "react"
import { Pressable as RNPressable, View, StyleSheet, PressableProps as RNPressableProps } from "react-native"
import { useTheme } from "contexts"

type PressableProps = RNPressableProps & {
    feedback?: boolean
}

export const Pressable = (props: PressableProps) => {
    const { children, feedback = true, style, ...rest } = props

    const styles = StyleSheet.create({
        container: {
            overflow: "hidden",
            width: "100%",
            ...style as {}
        },
    })

    return (
        <RNPressable
            style={styles.container}
            android_ripple={{
                color: feedback ? "lightgrey" : null,
            }}
            {...rest}
        >
            {children}
        </RNPressable >

    )
}

