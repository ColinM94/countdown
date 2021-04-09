import * as React from "react"
import { StyleSheet } from "react-native"
import { useToast, useTheme } from "contexts"
import { Card, ScreenView, Input, Button, Picker, Text, DateTimeInput } from "components"
import { addEvent, updateEvent } from "api/firestore"
import { Event } from "common/types"
import { useNavigation } from '@react-navigation/native'
import { Surface, TextInput } from "react-native-paper"

type EventFormProps = {
    id?: string,
    event?: Event
}

export const EventForm = ({ id, event }: EventFormProps) => {
    // State
    const [name, setName] = React.useState(event?.name ?? "")
    const [date, setDate] = React.useState(event?.date ?? new Date())
    const [color, setColor] = React.useState(event?.color ?? "")

    // Contexts
    const { showToast } = useToast()
    const { theme } = useTheme()
    const navigation = useNavigation()

    const handleSubmit = () => {
        if (name === "") {
            showToast("Please enter a name.")
            return
        }

        if (event) {
            updateEvent({ id: event.id, name, date, color, })
                .then(() => {
                    navigation.goBack()
                    showToast("Event Updated")
                })
                .catch(error => alert(error.message))
        } else {
            addEvent(name, date, color)
                .then(() => {
                    navigation.navigate("EventList")
                    showToast("Event Created")
                })
                .catch(error => alert(error.message))
        }
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
        card: {
            padding: theme.spacing(3)
        },
        input: {
            marginBottom: theme.spacing(3)
        },
        button: {
            marginTop: theme.spacing(3)
        }
    })

    return (
        <Card style={styles.card}>
            <Input label="Name" value={name} onChangeText={onNameChange} containerStyle={styles.input} />
            <DateTimeInput date={date} setDate={setDate} label="Date" mode="date" containerStyle={styles.input} />
            <DateTimeInput date={date} setDate={setDate} label="Time" mode="time" containerStyle={styles.input} />
            <Picker value={color} setValue={setColor} options={colorOptions} label="Colour" containerStyle={styles.input} />
            <Button title={event ? "Update" : "Add"} onPress={handleSubmit} style={styles.button} />
        </Card>
    )
}