import * as React from "react"
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useTheme } from "contexts"

type Props = {
    value: string,
    placeholder?: string,
    onChange?: (text: string) => void
}

export const Input = ({ value, placeholder, onChange }: Props) => {
    const { theme } = useTheme()

    const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const value = e.nativeEvent.text
        onChange ? onChange(value) : null
    }

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            padding: 10
        },
        input: {
            width: "100%",
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 5,
            paddingRight: 5,
            color: theme.colors.cardText,
            borderBottomWidth: 1,
            borderColor: "lightgrey",
            fontSize: 20
        }
    })

    return (
        <View style={styles.container}>
            <TextInput
                onChange={handleChange}
                value={value}
                placeholder={placeholder ?? ""}
                placeholderTextColor={theme.colors.cardText}
                style={styles.input}
            />
        </View>
    )
}
