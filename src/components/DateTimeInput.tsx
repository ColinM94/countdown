import * as React from "react"
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
    const { darkMode } = useTheme()

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