import * as React from 'react'
import { Text } from "react-native"

import { Card, ScreenView } from "components"
import { EventProps } from "navigation"

export const Event = ({ navigation, route }: EventProps) => {
    return (
        <ScreenView>
            <Card title="Event">
                <Text style={{ color: "white" }}>{route.params.id}</Text>
            </Card>
        </ScreenView>
    )
}