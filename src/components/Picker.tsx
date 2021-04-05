import * as React from "react"
import { StyleSheet } from "react-native"
import { BottomSheet, ListItem } from "react-native-elements"
import { Input } from "./Input"
import { useTheme } from "contexts"
import { Pressable } from "components"

type Option = {
    text: string,
    value?: string,
    color?: string
}

type PickerProps = {
    value: string,
    setValue: (value: string) => void,
    options: Option[],
    label: string
}

export const Picker = ({ value, setValue, options, label }: PickerProps) => {
    const { theme } = useTheme()
    const [listVisible, setListVisible] = React.useState(false)

    const handleClick = (option: string) => {
        setValue(option)
        setListVisible(false)
    }

    const styles = StyleSheet.create({
        item: {
            backgroundColor: theme.colors.card
        },
        cancelItem: {
            backgroundColor: "#d43c31",
            color: theme.colors.text
        },
        text: {
            color: theme.colors.text
        }
    })

    return (
        <>
            <Pressable onPress={() => setListVisible(true)} style={{ marginTop: theme.spacing }}>
                <Input
                    label={label}
                    value={value}
                    editable={false}
                />
            </Pressable>
            <BottomSheet isVisible={listVisible}>
                {options.map((item, index) => (
                    <ListItem
                        onPress={() => handleClick(item.value ?? item.text)}
                        key={index}
                        containerStyle={styles.item}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={{ color: item.color ?? theme.colors.card }}>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
                <ListItem onPress={() => setListVisible(false)} containerStyle={styles.cancelItem}>
                    <ListItem.Content>
                        <ListItem.Title style={{ color: "white" }}>Cancel</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheet>
        </>
    )
}