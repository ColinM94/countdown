import * as React from "react"
import { ColorValue, Pressable, StyleSheet, View } from "react-native"
import { Modal, ModalProps } from "../Modal"

interface ColorPickerProps extends Omit<ModalProps, "children"> {
    color: ColorValue
    setColor: (color: ColorValue) => void
}

export const ColorPicker = ({ show, setShow, color, setColor }: ColorPickerProps) => {
    const colors = [
        "#ff0000",
        "#ff4000",
        "#ff8000",
        "#ffbf00",
        "#ffff00",
        "#bfff00",
        "#80ff00",
        "#40ff00",
        "#00ff00",
        "#00ff40",
        "#00ff80",
        "#00ffbf",
        "#00ffff",
        "#00bfff",
        "#0080ff",
        "#0040ff",
        "#0000ff",
        "#4000ff",
        "#8000ff",
        "#bf00ff",
        "#ff00ff",
        "#ff00bf",
        "#ff0080",
        "#ff0040",
        "#ff0000",
    ]

    const styles = StyleSheet.create({
        container: {
            marginTop: "auto",
            marginRight: "auto",
            marginLeft: "auto",
            marginBottom: "auto",
            width: 250,
            height: 250,
            flexWrap: "wrap",
            backgroundColor: "white",
        },
        square: {
            height: 50,
            width: 50,
        },
    })

    return (
        <Modal show={show} setShow={setShow}>
            <View style={styles.container} testID="colorPicker">
                {colors.map((color, index) => (
                    <Pressable
                        style={({ pressed }) => [
                            styles.square,
                            { backgroundColor: color, opacity: pressed ? 0.6 : 1 },
                        ]}
                        onPress={() => setColor(color)}
                        key={index}
                        testID={`colorPicker.square-${index}`}
                    />
                ))}
            </View>
        </Modal>
    )
}
