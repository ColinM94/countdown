import * as React from "react"
import { ScreenView, EventForm } from "components"
import { AddEventProps } from "navigation"

export const AddEvent = ({ navigation, route }: AddEventProps) => {
    return (
        <ScreenView>
            <EventForm />
        </ScreenView>
    )
}