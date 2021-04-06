import * as React from "react"
import { TouchableOpacity, TextInput, Platform, StyleSheet } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import { formatDate, formatTime } from "common/helpers"
import { useTheme } from "contexts"
import { Input, Pressable } from "components"

type DatePickerProps = {
    date: Date,
    setDate: (date: Date) => void,
    label: string,
    mode: "date" | "time"
}

export const DatePicker = ({ date, setDate, label, mode }: DatePickerProps) => {
    const [show, setShow] = React.useState(false)
    const { theme } = useTheme()

    const onChange = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate ?? date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }

    const styles = StyleSheet.create({
        container: {
            width: "100%"
        }
    })

    return (
        <>
            <Input
                label={label ?? "Date"}
                value={mode == "date" ? formatDate(date) : formatTime(date)}
                editable={false}
                onPress={() => setShow(true)}
            />

            {show &&
                <DateTimePicker // date time picker code acquired here: https://github.com/react-native-datetimepicker/datetimepicker
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={(event, date) => onChange}
                />}
        </>
    )
}

export default DatePicker