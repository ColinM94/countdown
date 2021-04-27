import * as React from "react"
import { EditEventProps } from "navigation/types"
import { Text } from "library/Text"
import { ScreenView } from "library/ScreenView"
import { EventForm } from "components/EventForm"

export const EditEvent = ({ navigation, route }: EditEventProps) => {
    return (
        <ScreenView>
            <EventForm event={route.params.event} /> 
        </ScreenView>
    )
}