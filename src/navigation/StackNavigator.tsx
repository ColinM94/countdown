import * as React from "react"
import { StyleSheet } from "react-native"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { DrawerNavigator } from "./DrawerNavigator"
import { Event } from "screens"
import { RouteProp } from "@react-navigation/native"
import { useTheme } from "contexts"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

// Param types for each screen. 
type ScreenParams = {
    Drawer: undefined,
    Event: { id: string },
}

export type EventProps = {
    navigation: StackNavigationProp<ScreenParams, 'Event'>,
    route: RouteProp<ScreenParams, 'Event'>
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
            <Stack.Screen name="Event" component={Event} />
        </Stack.Navigator>
    )
}
