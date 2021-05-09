import * as React from "react"
import { Keyboard } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { formatDate, formatTime } from "common/helpers"
import { Input, InputProps } from "./Input"

interface DateTimePickerProps {
    /** If undefined, a placeholder will be displayed until value is chosen. */
    date: Date | undefined
    setDate: (date: Date) => void
    mode?: "date" | "time"
    isVisible: boolean
    setIsVisible: (visible: boolean) => void
}

export const DateTimePicker = (props: DateTimePickerProps) => {
    const { date, setDate, mode = "date", isVisible, setIsVisible } = props

    const showDatePicker = () => {
        setIsVisible(true)
    }

    const hideDatePicker = () => {
        setIsVisible(false)
    }

    const handleConfirm = (selectedDate: Date) => {
        hideDatePicker()
        setDate(selectedDate)
    }

    return (
        <DateTimePickerModal
            isVisible={isVisible}
            mode={mode}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={date}
            testID="dateTimePicker"
        />
    )
}
