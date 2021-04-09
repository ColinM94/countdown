import * as React from "react"
import { StyleSheet } from "react-native"
import { BottomSheet, ListItem } from "react-native-elements"
import { Input, InputProps } from "./Input"
import { useTheme } from "contexts"
import { Pressable } from "components"

type Option = {
    text: string,
    value?: string,
    color?: string
}

type PickerProps = InputProps & {
    value: string,
    setValue: (value: string) => void,
    options: Option[],
}

export const Picker = (props: PickerProps) => {
    const { options, setValue } = props
    const { theme } = useTheme()
    const [listVisible, setListVisible] = React.useState(false)

    const handleClick = (option: string) => {
        setValue(option)
        setListVisible(false)
    }

    const styles = StyleSheet.create({
        item: {
            backgroundColor: theme.colors.card,
        },
        cancelItem: {
            backgroundColor: "#d43c31",
/*             color: theme.colors.text
 */        },
        text: {
/*             color: theme.colors.text
 */        }
    })

    return (
        <>
            <Input
                editable={false}
                onPress={() => setListVisible(true)}
                {...props}
            />
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