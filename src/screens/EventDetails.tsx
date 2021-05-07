import * as React from 'react'
import { EventDetailsProps } from 'navigation/types'
import { EventInfo } from 'common/types'
import { Event } from "components/Event"



export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const [eventInfo, setEventInfo] = React.useState<EventInfo>(route.params.eventInfo)

    React.useEffect(() => {
        setEventInfo(route.params.eventInfo)
    }, [route.params.eventInfo])

    return (
       <Event eventInfo={eventInfo} icon="check"/>
    )
}
