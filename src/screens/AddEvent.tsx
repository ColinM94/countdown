import * as React from "react"


import { useToast } from "contexts"
import { useNavigation } from "@react-navigation/native"

import { ScreenView, Button } from "components"
import { addEvent } from "api/firestore"

export const AddEvent = () => {
    // State
    const [name, setName] = React.useState("")

    // Contexts
    const { showToast } = useToast()
    const navigation = useNavigation()

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
            <Button title="Home" onPress={() => navigation.navigate("Home")} />
            <Button title="Event" onPress={() => navigation.navigate("Event", { id: "TESJKH KJDSHFKJDSH" })} />
            <Button title="Add Event" onPress={() => navigation.navigate("Add Event")} />
        </ScreenView>
    )
}