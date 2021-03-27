import * as React from 'react'
import { ScreenView, Button } from "components"
import { EventProps } from "navigation"

export const Event = ({ navigation, route }: EventProps) => {
    return (
        <ScreenView>
            <Button title="Home" onPress={() => navigation.navigate("Home")} />
            <Button title="Event" onPress={() => navigation.navigate("Event", { id: "TESJKH KJDSHFKJDSH" })} />
            <Button title="Add Event" onPress={() => navigation.navigate("Add Event")} />
        </ScreenView>
    )
}