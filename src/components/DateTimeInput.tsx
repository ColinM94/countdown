import * as React from "react"
import { Text, View, StyleSheet } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { formatDate, formatTime } from "common/helpers"
import { Button, Input } from "components"
import { InputProps } from "components"
import { useTheme } from "contexts"

type DatePickerProps = InputProps & {
    date: Date,
    setDate: (date: Date) => void,
    mode: "date" | "time",
}

export const DateTimeInput = (props: DatePickerProps) => {
    const { date, setDate, label, mode, style } = props
    const [isPickerVisible, setIsPickerVisible] = React.useState(false)
    const { theme, darkMode } = useTheme()

    const showDatePicker = () => {
        setIsPickerVisible(true)
    }

    const hideDatePicker = () => {
        setIsPickerVisible(false)
    }

    const handleConfirm = (newDate: Date) => {
        hideDatePicker()
        setDate(newDate)
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            borderBottomWidth: 1,
            /* borderColor: focused ? theme.colors.primary : theme.colors.text.secondary, */
            borderColor: theme.colors.text.tertiary,
        },
        label: {
            ...theme.typography.overline as {}
        },
        value: {
            paddingVertical: 5,
            ...theme.typography.body as {}
        }
    })

    return (
        <>
            <Input
                label={label ?? "Date"}
                value={mode === "date" ? formatDate(date) : formatTime(date)}
                onPress={() => showDatePicker()}
                editable={false}
                showSoftInputOnFocus={false}
                caretHidden={true}
                {...props}
            />

            {/*             <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <Text onPress={() => showDatePicker()} style={styles.value}>
                    {formatDate(date)}
                </Text>
            </View> */}

            <DateTimePickerModal
                date={date}
                isVisible={isPickerVisible}
                mode={mode}
                is24Hour={true}
                locale="en_GB" // Forces 24 hour on IOS. 
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                isDarkModeEnabled={darkMode}
            />
        </>
    )
}

export default DateTimeInput