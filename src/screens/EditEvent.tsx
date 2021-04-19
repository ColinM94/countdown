import * as React from "react"
import { EditEventProps } from "navigation/types"
import { Text } from "library/Text"
import { ScreenView } from "library/ScreenView"

export const EditEvent = ({ navigation, route }: EditEventProps) => {
    return (
        <ScreenView>
            <Text>Edit Event</Text>
            {/*<EventForm event={route.params.event} /> */} 
       </ScreenView>
    )
}