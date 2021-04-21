import * as React from "react"
import { StyleSheet, View, TouchableWithoutFeedbackProps, TouchableNativeFeedback } from "react-native"
import { useTheme } from "contexts/ThemeContext"

export interface MyViewProps extends TouchableWithoutFeedbackProps {
    onPress?: () => void,
    /** Components rendered inside this view. */
    children?: React.ReactNode | React.ReactNode[]
    /** Color of press feedback. */
    feedbackColor?: string
    /** Flex direction column */
    column?: boolean
    /** Flex direction. Default is 'column'.*/
    direction?: "row" | "column"
    /** Bottom Margin */
    mb?: number
    /** Enable/Disable onPress feedback. Default is true.  */
    feedbackEnabled?: boolean
    /** 
        * 'auto': The View can be the target of touch events.
        * 'none': The View is never the target of touch events.
        * 'box-none': The View is never the target of touch events but its subviews can be. 
        * 'box-only': The view can be the target of touch events but its subviews cannot be.
    */
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto'
}

export const MyView = ({ children, onPress, style, feedbackColor, mb, direction = "column", feedbackEnabled = true, pointerEvents="auto", ...rest }: MyViewProps) => {
    const { theme } = useTheme()

    // Combines objects in style array into one object. 
    const flattenStyle = StyleSheet.flatten([style])

    const styles = StyleSheet.create({
        rippleFix: {  // Prevents padding being applied to container, as this breaks the ripple effect. 
            overflow: "hidden",
            borderRadius: flattenStyle?.borderRadius,
            margin: flattenStyle?.margin,
            marginVertical: flattenStyle?.marginVertical,
            marginHorizontal: flattenStyle?.marginHorizontal,
            marginTop: flattenStyle?.marginTop,
            marginBottom: mb ?? flattenStyle?.marginBottom,
            marginLeft: flattenStyle?.marginLeft,
            marginRight: flattenStyle?.marginRight,
            padding: 0,
        },
        touchable: {
            padding: flattenStyle?.padding,
            paddingVertical: flattenStyle?.paddingVertical,
            paddingHorizontal: flattenStyle?.paddingHorizontal,
            paddingTop: flattenStyle?.paddingTop,
            paddingBottom: flattenStyle?.paddingBottom,
            paddingLeft: flattenStyle?.paddingLeft,
            paddingRight: flattenStyle?.paddingRight,
            flexDirection: direction,
            elevation: flattenStyle?.elevation,
            margin: 0,
        },
    })

    return (
        <View style={[flattenStyle, styles.rippleFix]}>
            <TouchableNativeFeedback
                onPress={onPress}
                background={feedbackEnabled ? TouchableNativeFeedback.Ripple(onPress ? feedbackColor ?? theme.colors.accent : "rgba(0,0,0,0)", false) : undefined}
                style={styles.touchable}
                delayLongPress={200}
                {...rest}
            >
                <View style={styles.touchable}  pointerEvents={pointerEvents}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}