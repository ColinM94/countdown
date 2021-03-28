import * as React from "react"
import { StyleSheet } from "react-native"
import { useToast, useTheme } from "contexts"
import { Card, ScreenView, Input, Button } from "components"
import { addEvent } from "api/firestore"
import { AddEventProps } from "navigation"
import { DatePicker } from "components/DatePicker"

export const AddEvent = ({ navigation, route }: AddEventProps) => {
    // State
    const [name, setName] = React.useState<string>("")
    const [date, setDate] = React.useState<Date>(new Date())
    const [time, setTime] = React.useState<Date>(new Date())

    // Contexts
    const { showToast } = useToast()
    const { theme } = useTheme()

    const addToDb = () => {
        addEvent(name)
            .then(() => showToast("Event Created"))
            .catch(error => alert(error.message))
    }

    const onNameChange = (text: string) => {
        setName(text)
    }

    const styles = StyleSheet.create({
        input: {
            marginTop: theme.spacing / 2
        },
        button: {
            marginTop: theme.spacing * 2,
            marginBottom: theme.spacing
        }
    })

    return (
        <ScreenView>
            <Card title="Add Event">
                <Input label="Name" value={name} onChangeText={onNameChange} style={styles.input} />
                <Input label="Location" value={name} onChangeText={onNameChange} style={styles.input} />
                <DatePicker date={date} setDate={setDate} label="Event Date" mode="date" />
                <DatePicker date={date} setDate={setDate} label="Event Date" mode="time" />
                <Button title="Add" onPress={addToDb} style={styles.button} />
            </Card>
        </ScreenView>
    )
}