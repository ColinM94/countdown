import * as React from 'react'
import { ScreenView, Button } from "components"
import { HomeProps } from "navigation"

export const Home = ({ navigation, route }: HomeProps) => {
    return (
        <ScreenView>
            <Button title="Home" onPress={() => navigation.navigate("Home")} />
            <Button title="Event" onPress={() => navigation.navigate("Event", { id: "TESJKH KJDSHFKJDSH" })} />
            <Button title="Add Event" onPress={() => navigation.navigate("Add Event")} />
        </ScreenView>
    )
}