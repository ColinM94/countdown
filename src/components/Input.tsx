import * as React from "react"
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInputProps, Text } from "react-native"
import { useTheme } from "contexts"

type InputProps = TextInputProps & {
    label: string
}

export const Input = (props: InputProps) => {
    const { theme } = useTheme()
    const { label } = props

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            padding: theme.spacing,
            ...props.style as {}
        },
        label: {
            marginBottom: theme.spacing / 2,
            color: theme.colors.text,
            ...theme.text.label,
        },
        input: {
            color: theme.colors.text,
            borderBottomWidth: 1,
            borderColor: theme.colors.text,
            paddingBottom: 5,
            ...theme.text.input,
        }
    })

    return (
        <View style={styles.container}>
            {label &&
                <Text style={styles.label}>{label}</Text>
            }
            <TextInput
                placeholderTextColor={theme.colors.text}
                {...props}
                style={styles.input}
            />
        </View>
    )
}

// Properties before ...props will be overwrited if passed in. 