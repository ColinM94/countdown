import * as React from "react"
import { Keyboard, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native"
import { useTheme } from "contexts"
import { IconButton, Pressable } from "components"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
/* import { TextInput, TextInputProps } from "react-native-paper" */

export type InputProps = TextInputProps & {
    onPress?: () => void,
    label?: string,
    rightIcon?: IconProp,
    rightIconOnPress?: () => void,
    containerStyle?: StyleProp<ViewStyle>,
}

export const Input = (props: InputProps) => {
    const { theme } = useTheme()
    const { label, onPress, rightIcon, rightIconOnPress, style, containerStyle } = props
    const [focused, setFocused] = React.useState(false)

    let textInput: any = null

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            borderBottomWidth: 1,
            /* borderColor: focused ? theme.colors.primary : theme.colors.text.secondary, */
            borderColor: theme.colors.text.tertiary,
            ...containerStyle as {},
        },
        inputRow: {
            flexDirection: "row",
        },
        label: {
            ...theme.typography.overline as {}
        },
        input: {
            flex: 1,
            paddingVertical: 5,
            ...theme.typography.body as {},
            ...style as {}
        },
    })

    const handlePress = () => {
        textInput.focus()
        setFocused(true)
        onPress && onPress()
    }

    const handleFocus = () => {
        setFocused(true)
        onPress && onPress()
    }

    const handleBlur = () => {
        setFocused(false)
    }

    return (
        <Pressable onPress={handlePress} style={styles.container} feedback={false} >
            <View pointerEvents="none" style={{ flexDirection: "column", flexGrow: 1 }}>
                {label && <Text style={styles.label}>{label}</Text>}
                <TextInput
                    ref={(input) => { textInput = input; }}
                    onBlur={handleBlur}
                    placeholderTextColor={theme.colors.text.secondary}
                    style={styles.input}
                    {...props}
                />
            </View>
            <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
                {rightIcon && <IconButton icon={rightIcon} onPress={rightIconOnPress} style={{}} />}
            </View>
        </Pressable>
    )
}
