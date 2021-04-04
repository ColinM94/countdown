import * as React from "react"
import { StyleSheet } from "react-native"
import { useToast, useTheme } from "contexts"
import { Card, ScreenView, Input, Button, Picker, DatePicker } from "components"
import { addEvent } from "api/firestore"
import { AddEventProps } from "navigation"

export const AddEvent = ({ navigation, route }: AddEventProps) => {
    // State
    const [name, setName] = React.useState("")
    const [date, setDate] = React.useState(new Date())
    const [color, setColor] = React.useState("")

    // Contexts
    const { showToast } = useToast()
    const { theme } = useTheme()

    const handleSubmit = () => {
        if (name === "") {
            showToast("Please enter a name.")
            return
        }

        addEvent(name, date, color)
            .then(() => {
                navigation.navigate("EventList")
                showToast("Event Created")
            })
            .catch(error => alert(error.message))
    }

    const onNameChange = (text: string) => {
        setName(text)
    }

    const colorOptions = [
        {
            text: "Red",
        },
        {
            text: "Blue",
        },
    ]

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
            <Card>
                <Input label="Name" value={name} onChangeText={onNameChange} style={styles.input} />
                <DatePicker date={date} setDate={setDate} label="Date" mode="date" />
                <DatePicker date={date} setDate={setDate} label="Time" mode="time" />
                <Picker value={color} setValue={setColor} options={colorOptions} label="Colour" />
                <Button title="Add" onPress={handleSubmit} style={styles.button} />
            </Card>
        </ScreenView>
    )
}