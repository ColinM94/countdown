import { Pressable } from "components"
import * as React from "react"
import { BottomSheet, ListItem } from "react-native-elements"
import { Input } from "./Input"
import { useTheme } from "contexts"

type Option = {
    text: string,
    value: string
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
                    <ListItem onPress={() => handleClick(item.value)} key={index}>
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
                <ListItem onPress={() => setListVisible(false)} containerStyle={{ backgroundColor: "red", color: "white" }}>
                    <ListItem.Content>
                        <ListItem.Title style={{ color: "white" }}>Cancel</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheet>
        </>
    )
}