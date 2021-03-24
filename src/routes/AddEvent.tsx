import * as React from "react"
import ContentView from "components/ContentView"
import { TextInput, Text, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { addEvent } from "api/firestore"
import { Button } from "components/Button"
import { ToastContext } from "contexts/ToastContext"

export const AddEvent = () => {
    // State
    const [name, setName] = React.useState("")

    // Contexts
    const { showToast } = React.useContext(ToastContext)

    const addToDb = () => {
        addEvent(name).then(() => showToast("Event Created")).catch(error => alert(error.message))
    }

    const onNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setName(e.nativeEvent.text)
    }

    return (
        <ContentView>
            <TextInput value={name} onChange={onNameChange} style={{ color: "white" }} />
            <Button title="Add Event" onPress={addToDb}></Button>
        </ContentView>
    )
}