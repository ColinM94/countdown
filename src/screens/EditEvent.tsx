import * as React from "react"
import { EditEventProps } from "navigation/types"
import { Text } from "library/Text"
import { ScreenView } from "library/ScreenView"
import { EventForm } from "components/EventForm"
import { StatusBar } from "library/StatusBar"

export const EditEvent = ({ navigation, route }: EditEventProps) => {
    return (
        <ScreenView>
            <StatusBar />
            <EventForm event={route.params.event} /> 
        </ScreenView>
    )
}