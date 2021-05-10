import * as React from "react"
import { StyleSheet, Modal, View, FlatList } from "react-native"
import { Text } from "library/Text"
import { useTheme } from "contexts/ThemeContext"
import { Pressable } from "../Pressable"

export type PickerItem = {
    text: string
    value: string
}

interface PickerProps {
    value: string
    setValue: (value: string) => void
    show: boolean
    setShow: (show: boolean) => void
    data: PickerItem[]
}

export const Picker = ({
    value,
    setValue,
    show,
    setShow,
    data,
}: PickerProps) => {
    const { theme } = useTheme()

    const hidePicker = () => {
        setShow(false)
    }

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            bottom: 0,
            backgroundColor: theme.colors.card,
            width: "100%",
        },
        item: {
            padding: 16,
        },
        selectableItem: {
            backgroundColor: theme.colors.card,
        },
        cancelItem: {
            backgroundColor: theme.colors.primary,
            borderRadius: 0,
        },
    })

    const handlePress = (item: PickerItem) => {
        setValue(item.value)
        hidePicker()
    }

    const renderItem = ({ item }: { item: PickerItem }) => (
        <Pressable
            onPress={() => handlePress(item)}
            style={[styles.item, styles.selectableItem]}
        >
            <Text
                subtitle
                style={{
                    color:
                        item.value === value
                            ? theme.colors.text.primary
                            : theme.colors.text.tertiary,
                }}
            >
                {item.text}
            </Text>
        </Pressable>
    )

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(!show)
            }}
        >
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.value}
                />
                <Pressable
                    onPress={hidePicker}
                    style={[styles.item, styles.cancelItem]}
                >
                    <Text subtitle>Cancel</Text>
                </Pressable>
            </View>
        </Modal>
    )
}
