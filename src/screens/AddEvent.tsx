import * as React from "react"
import { AddEventProps } from "navigation/types"
import { ScreenView } from "library/ScreenView"
import { Event } from "components/Event"

export const AddEvent = ({navigation, route}: AddEventProps) => {
  return (
    <Event />
  )
}