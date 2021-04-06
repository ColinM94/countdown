import * as React from "react"
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputChangeEventData, TextInputProps, Text } from "react-native"
import { useTheme } from "contexts"
import { Pressable } from "components"
import { TouchableOpacity } from "react-native-gesture-handler"

type InputProps = TextInputProps & {
    onPress?: () => void,
    label?: string,
}

export const Input = (props: InputProps) => {
    const { theme } = useTheme()
    const { label, onPress } = props
    let textInput: any = null

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            paddingVertical: theme.spacing(),
            ...props.style as {}
        },
        label: {
            ...theme.typography.overline as {}
        },
        input: {
            ...theme.typography.body as {},
            borderBottomWidth: 1,
            borderColor: theme.colors.text.secondary,
            paddingTop: theme.spacing(),
            paddingBottom: 4
        }
    })

    const handlePress = () => onPress ? onPress() : textInput.focus()

    return (
        <Pressable onPress={handlePress} style={styles.container} feedback={onPress ? true : false}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                ref={(input) => { textInput = input; }}
                placeholderTextColor={theme.colors.text.secondary}
                {...props}
                style={styles.input}
            />
        </Pressable>
    )
}

// Properties before ...props will be overwritten if passed in. 