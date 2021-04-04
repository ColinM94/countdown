import * as React from "react"
import { Pressable, StyleSheet } from "react-native"
import { createStackNavigator, HeaderTitle, StackNavigationProp } from "@react-navigation/stack"
import { DrawerNavigator } from "./DrawerNavigator"
import { AddEvent, EventDetails } from "screens"
import { RouteProp } from "@react-navigation/native"
import { useTheme } from "contexts"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Event } from "common/types"
import { Header, IconButton } from "components"

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
        },
        icon: {
            color: theme.colors.text,
            ...theme.text.button as {},
        },
        rightIcon: {

        },
    })

    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerTitleStyle: theme.text.h1,
                headerShown: true,
                headerLeft: () => <IconButton icon="arrow-left" onPress={() => navigation.goBack()} containerStyle={{ marginLeft: 5 }} />
            })}


        >
            <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="EventDetails"
                component={EventDetails}
                options={{
                    title: "Event Details",
                    headerRight: () => <IconButton onPress={() => { alert("Edit") }} icon="pencil-alt" containerStyle={{ marginRight: 5 }} />
                }}
            />
            <Stack.Screen
                name="AddEvent"
                component={AddEvent}
                options={{
                    title: "Add Event"
                }}
            />
        </Stack.Navigator>
    )
}
