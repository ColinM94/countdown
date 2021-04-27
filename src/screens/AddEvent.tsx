import * as React from "react"
import { AddEventProps } from "navigation/types"
import { ScreenView } from "library/ScreenView"
import { EventForm } from "components/EventForm"

export const AddEvent = ({navigation, route}: AddEventProps) => {
  return (
      <ScreenView>
        <EventForm />
      </ScreenView>
  )
}