import * as React from "react"
import { ColorValue, Pressable, StyleSheet, View} from "react-native"
import { Modal, ModalProps } from "./Modal"

interface ColorPickerProps extends Omit<ModalProps, "children"> {
    color: ColorValue
    setColor: (color: ColorValue) => void
}

export const ColorPicker = ({show, setShow, color, setColor}: ColorPickerProps) => {
    const styles = StyleSheet.create({
        container: {
            width: 250,
            height: 250,
            flexWrap: "wrap",
        },
        square: {
            height: 50,
            width: 50,
        },
    })  

    const colors = [
        "#ff0000", "#ff4000", "#ff8000", "#ffbf00", 
        "#ffff00", "#bfff00", "#80ff00", "#40ff00", 
        "#00ff00", "#00ff40", "#00ff80", "#00ffbf",
        "#00ffff", "#00bfff", "#0080ff", "#0040ff",
        "#0000ff", "#4000ff", "#8000ff", "#bf00ff",
        "#ff00ff", "#ff00bf", "#ff0080", "#ff0040",
        "#ff0000"
    ]

    return ( 
        <Modal show={show} setShow={setShow}>
            <View style={styles.container}>
                {
                    colors.map(color => <Pressable style={[styles.square, {backgroundColor: color}]} onPress={() => setColor(color)}/>)
                }
            </View>
        </Modal>  
    )
}