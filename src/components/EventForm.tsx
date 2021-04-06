import * as React from "react"
import { StyleSheet } from "react-native"
import { useToast, useTheme } from "contexts"
import { Card, ScreenView, Input, Button, Picker, DatePicker, Text } from "components"
import { addEvent } from "api/firestore"
import { Event } from "common/types"
import { useNavigation } from '@react-navigation/native'

type EventFormProps = {
    id?: string
}

export const EventForm = ({ id }: EventFormProps) => {
    // State
    const [name, setName] = React.useState("")
    const [date, setDate] = React.useState(new Date())
    const [color, setColor] = React.useState("")

    // Contexts
    const { showToast } = useToast()
    const { theme } = useTheme()
    const navigation = useNavigation()

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
            value: "#eb4034",
            color: "#eb4034"
        },
        {
            text: "Blue",
            value: "#3b49e3",
            color: "#3b49e3"
        },
        {
            text: "Gold",
            value: "gold",
            color: "gold"
        },
        {
            text: "Purple",
            value: "#6f36e0",
            color: "#6f36e0"
        },
    ]

    const styles = StyleSheet.create({
        input: {

        },
        button: {
            marginTop: theme.spacing(),
        }
    })

    return (
        <Card style={{ paddingVertical: theme.spacing(), paddingHorizontal: theme.spacing(3) }}>
            <Input label="Name" value={name} onChangeText={onNameChange} />
            <DatePicker date={date} setDate={setDate} label="Date" mode="date" />
            <DatePicker date={date} setDate={setDate} label="Time" mode="time" />
            <Picker value={color} setValue={setColor} options={colorOptions} label="Colour" />
            <Button title={id ? "Update" : "Add"} onPress={handleSubmit} style={styles.button} />
        </Card>
    )
}