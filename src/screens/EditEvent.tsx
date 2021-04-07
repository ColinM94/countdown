import * as React from "react"
import { EventForm, IconButton, ScreenView, Text } from "components"
import { EditEventProps } from "navigation"

export const EditEvent = ({ navigation, route }: EditEventProps) => {
    return (
        <ScreenView>
            <EventForm event={route.params.event} />
        </ScreenView>
    )
}