import * as React from "react"
import { Platform } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import { formatDate, formatTime } from "common/helpers"
import { Input } from "components"
import { InputProps } from "components"

type DatePickerProps = InputProps & {
    date: Date,
    setDate: (date: Date) => void,
    mode: "date" | "time",
}

export const DateTimeInput = (props: DatePickerProps) => {
    const { date, setDate, label, mode, style } = props

    const [show, setShow] = React.useState(false)
    const [dateSelected, setDateSelected] = React.useState(false)

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate ?? date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        setDateSelected(true)
    }

    return (
        <>
            <Input
                label={label ?? "Date"}
                value={dateSelected ? mode == "date" ? formatDate(date) : formatTime(date) : ""}
                onPress={() => setShow(true)}
                rightIcon={mode == "date" ? "calendar" : "clock"}
                rightIconOnPress={() => setShow(true)}
                showSoftInputOnFocus={false}
                caretHidden={true}
                {...props}
            />

            {show &&
                <DateTimePicker // date time picker code acquired here: https://github.com/react-native-datetimepicker/datetimepicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />}
        </>
    )
}

export default DateTimeInput