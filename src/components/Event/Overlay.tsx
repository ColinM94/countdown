import * as React from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { Modal } from "library/Modal"

interface OverlayProps {
    showCustomiseModal: boolean
    setShowCustomiseModal: (showCustomiseModal: boolean) => void
}

export const Overlay = (props: OverlayProps) => {
    const { theme } = useTheme()

    const { showCustomiseModal, setShowCustomiseModal } = props

    const styles = StyleSheet.create({
        customiseModal: {
            flexDirection: "row",
            padding: theme.spacing.primary,
            position: "absolute",
            right: 0,
            left: 0,
            top: 0,
        },
    })

    return (
        <>
            <Modal
                show={showCustomiseModal}
                setShow={setShowCustomiseModal}
                closeOnOutsidePress={false}
                animationType="fade"
                onRequestClose={() => alert("Are you sure?")}
            >
                <View style={styles.customiseModal}>
                    <IconButton icon="image" onPress={() => setShowImagePicker(!showImagePicker)} />
                    <IconButton
                        icon="palette"
                        style={styles.headerBtn}
                        onPress={() => setShowColorPicker(!showColorPicker)}
                    />
                    <IconButton
                        icon="calendar-alt"
                        style={styles.headerBtn}
                        onPress={() => setShowDatePicker(!showDatePicker)}
                    />
                    <IconButton
                        icon="clock"
                        style={styles.headerBtn}
                        onPress={() => setShowTimePicker(!showTimePicker)}
                    />
                    <IconButton
                        icon="pencil-alt"
                        style={styles.headerBtn}
                        onPress={() => setShowColorPicker(!showColorPicker)}
                    />
                </View>
                <FAB icon="check" onPress={() => setShowCustomiseModal(false)} color="#2EA043" />
                <FAB icon="undo" onPress={() => setShowCustomiseModal(false)} style={{ bottom: 84 }} />
                <View style={styles.sliderContainer}>
                    <Slider
                        value={sliderValue}
                        minimumValue={0}
                        maximumValue={6}
                        step={1}
                        minimumTrackTintColor={theme.colors.primary}
                        maximumTrackTintColor="#FFFFFF"
                        onValueChange={setSliderValue}
                        thumbTintColor={theme.colors.primary}
                    />
                </View>
            </Modal>
            <Menu show={showMenu} setShow={setShowMenu} items={menuItems} />
            <ColorPicker
                show={showColorPicker}
                setShow={setShowColorPicker}
                color={backgroundColor}
                setColor={setBackgroundColor}
            />
            <ImagePicker setImage={setImage} show={showImagePicker} setShow={setShowImagePicker} />
            <DateTimePicker
                date={date}
                setDate={setDate}
                show={showDatePicker}
                setShow={setShowDatePicker}
                mode="date"
            />
            <DateTimePicker
                date={date}
                setDate={setDate}
                show={showTimePicker}
                setShow={setShowTimePicker}
                mode="time"
            />
        </>
    )
}
