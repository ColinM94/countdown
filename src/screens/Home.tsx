import * as React from 'react'
import { Text } from "react-native"
import { ScreenView, Button, Card } from "components"
import { HomeProps } from "navigation"

export const Home = ({ navigation, route }: HomeProps) => {
    return (
        <ScreenView>
            <Card title="Home">
                <Button title="Event" onPress={() => navigation.navigate("Event", { id: "hedsf" })} />
            </Card>
        </ScreenView>
    )
}