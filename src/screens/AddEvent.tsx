import * as React from "react"
import { Text } from "react-native"

import { useToast } from "contexts"
import { Card, ScreenView, Input, Button } from "components"
import { addEvent } from "api/firestore"
import { AddEventProps } from "navigation"

export const AddEvent = ({ navigation, route }: AddEventProps) => {
    // State
    const [name, setName] = React.useState("")

    // Contexts
    const { showToast } = useToast()

    const addToDb = () => {
        addEvent(name)
            .then(() => showToast("Event Created"))
            .catch(error => alert(error.message))
    }

    const onNameChange = (text: string) => {
        setName(text)
    }

    return (
        <ScreenView>
            <Card title="Add Event">
                <Input placeholder="Title" value={name} onChange={onNameChange} />
                <Button title="Add" onPress={addToDb} />
            </Card>
        </ScreenView>
    )
}