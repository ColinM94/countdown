import { DrawerNavigationProp } from "@react-navigation/drawer"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { EventInfo } from "common/types"

// Param types for each screen. 
export type ScreenParams = {
    Signin: undefined,
    Drawer: undefined,
    AddEvent: undefined,
    EditEvent: { eventInfo: EventInfo },
    EventDetails: { eventInfo: EventInfo },
    EventList: undefined,
    Settings: undefined
}

export type SigninProps = {
    navigation: StackNavigationProp<ScreenParams, 'Signin'>,
    route: RouteProp<ScreenParams, 'Signin'>
}

export type EventDetailsProps = {
    navigation: StackNavigationProp<ScreenParams, 'EventDetails'>,
    route: RouteProp<ScreenParams, 'EventDetails'>
}

export type EditEventProps = {
    navigation: StackNavigationProp<ScreenParams, 'EditEvent'>,
    route: RouteProp<ScreenParams, 'EditEvent'>
}

export type EventsProps = {
    navigation: DrawerNavigationProp<ScreenParams, 'EventList'>,
    route: RouteProp<ScreenParams, 'EventList'>
}

export type AddEventProps = {
    navigation: DrawerNavigationProp<ScreenParams, 'AddEvent'>,
    route: RouteProp<ScreenParams, 'AddEvent'>
}

export type SettingsProps = {
    navigation: DrawerNavigationProp<ScreenParams, "Settings">
    route: RouteProp<ScreenParams, 'Settings'>
}