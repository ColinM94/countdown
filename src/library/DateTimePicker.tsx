import * as React from "react"
import { Keyboard } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { formatDate, formatTime } from "common/helpers"
import { Input, InputProps } from "./Input"

interface DateTimePickerProps extends Omit<InputProps, "value" | "setValue">  {
    /** If undefined, a placeholder will be displayed until value is chosen. */
    value: Date | undefined
    setValue: (date: Date) => void
    mode?: "date" | "time",
}

export const DateTimePicker = (props: DateTimePickerProps) => {
    const { value, setValue, mode = "date", placeholder="Date", style, ...rest } = props
  
    const [formattedDate, setFormattedDate] = React.useState<string | undefined>()
    const [isVisible, setIsVisible] = React.useState(false)

    const showDatePicker = () => {
        setIsVisible(true)
        Keyboard.dismiss()
    }

    const hideDatePicker = () => {
        setIsVisible(false)
    }

    const handleConfirm = (date: Date) => { 
        setFormattedDate(mode === "date" ? formatDate(date) : formatTime(date))
        setValue(date)
        hideDatePicker()
    }

    React.useEffect(() => {
        if(!value) {
            setFormattedDate(undefined)
        } else if (mode === "date") {
            setFormattedDate(formatDate(value))
        } else if (mode === "time") {
            setFormattedDate(formatTime(value))
        }
    }, [value])

    return (
        <>
            <Input
                value={formattedDate}
                placeholder={placeholder}
                onPress={showDatePicker}
                showSoftInputOnFocus={false} 
                caretHidden={true}
                {...rest}
            />

            <DateTimePickerModal
                isVisible={isVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={value}
                isDarkModeEnabled={true}
                timePickerModeAndroid='default'
            />
        </>
    )
}