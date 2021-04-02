import * as React from "react"
import { StyleSheet } from "react-native"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { DrawerNavigator } from "./DrawerNavigator"
import { AddEvent, EventDetails } from "screens"
import { RouteProp } from "@react-navigation/native"
import { useTheme } from "contexts"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Event } from "common/types"

// Param types for each screen. 
type ScreenParams = {
    Drawer: undefined,
    AddEvent: undefined,
    EventDetails: { id: string, event?: Event },
}

export type EventProps = {
    navigation: StackNavigationProp<ScreenParams, 'EventDetails'>,
    route: RouteProp<ScreenParams, 'EventDetails'>
}

// <Params> adds Type checking for initialParams screen prop. 
const Stack = createStackNavigator<ScreenParams>()

export const StackNavigator = () => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        drawerIcon: {
            marginLeft: 15,
            color: theme.colors.text
        }
    })

    return (
        <Stack.Navigator
            screenOptions={{

            }}
        >
            <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="EventDetails"
                component={EventDetails}
                options={{
                    title: "Event Details"
                }}
            />
            <Stack.Screen
                name="AddEvent"
                component={AddEvent}
            />
        </Stack.Navigator>
    )
}
