import { DrawerNavigationProp } from "@react-navigation/drawer"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { EventInfo } from "common/types"

// Param types for each screen.
export type ScreenParams = {
    Signin: undefined
    Event: { eventInfo: EventInfo } | undefined
    Events: undefined
    Settings: undefined
}

export type SigninProps = {
    navigation: StackNavigationProp<ScreenParams, "Signin">
    route: RouteProp<ScreenParams, "Signin">
}

export type EventProps = {
    navigation: StackNavigationProp<ScreenParams, "Event">
    route: RouteProp<ScreenParams, "Event">
}

export type EventsProps = {
    navigation: StackNavigationProp<ScreenParams, "Events">
    route: RouteProp<ScreenParams, "Events">
}

export type SettingsProps = {
    navigation: DrawerNavigationProp<ScreenParams, "Settings">
    route: RouteProp<ScreenParams, "Settings">
}
