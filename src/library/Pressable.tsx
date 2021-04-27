import * as React from "react"
import { StyleSheet, Pressable as RNPressable, PressableProps as RNPressableProps, StyleProp } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { ViewStyle } from "react-native"

export interface PressableProps extends RNPressableProps {
    /** Enable/Disable onPress feedback. Default is true.  */
    feedback?: boolean
    style?: StyleProp<ViewStyle>
}

export const Pressable = (props: PressableProps) => {
    const { theme } = useTheme()
    const { children, style, feedback=true, ...rest } = props

    // Combines objects in style array into one object. 
    const flattenStyle = StyleSheet.flatten([style])

    return (
        <RNPressable
            style={({ pressed }) => [
                flattenStyle,
                {
                    backgroundColor: feedback ? pressed ? theme.colors.feedback : flattenStyle?.backgroundColor ?? 'rgba(0,0,0,0)' : flattenStyle?.backgroundColor,
                    flexDirection: flattenStyle?.flexDirection ?? "column"
                },
            ]}
            hitSlop={10}
            {...rest}
        >
            {children}
        </RNPressable>
    )
}