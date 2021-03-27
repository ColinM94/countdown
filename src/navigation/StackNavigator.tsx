import * as React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { Home, Event, AddEvent } from "screens"

// Param types for each screen. 
export type Params = {
    Home: undefined,
    Event: { id: string },
    "Add Event": undefined
}

export type HomeProps = {
    navigation: StackNavigationProp<Params, 'Home'>,
    route: RouteProp<Params, 'Home'>
}

export type EventProps = {
    navigation: StackNavigationProp<Params, 'Event'>,
    route: RouteProp<Params, 'Event'>
}

export type AddEventProps = {
    navigation: StackNavigationProp<Params, 'Add Event'>,
    route: RouteProp<Params, 'Add Event'>
}

// <Params> adds Type checking for initialParams screen prop. 
const Stack = createStackNavigator<Params>()

export const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Event" component={Event} /* initialParams={{ id: 324 }} */ />
            <Stack.Screen name="Add Event" component={AddEvent} />
        </Stack.Navigator>
    )
}
