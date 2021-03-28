import * as React from "react"
import { StyleSheet } from "react-native"
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import { Home, AddEvent, Events, Settings } from "screens"
import { useTheme } from "contexts"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

type ScreenParams = {
    Home: undefined,
    Events: undefined,
    AddEvent: undefined,
    Settings: undefined
}

export type HomeProps = {
    navigation: DrawerNavigationProp<ScreenParams, 'Home'>,
    route: RouteProp<ScreenParams, 'Home'>
}

export type EventsProps = {
    navigation: DrawerNavigationProp<ScreenParams, 'Events'>,
    route: RouteProp<ScreenParams, 'Events'>
}

export type AddEventProps = {
    navigation: DrawerNavigationProp<ScreenParams, 'AddEvent'>,
    route: RouteProp<ScreenParams, 'AddEvent'>
}

export type SettingsProps = {
    navigation: DrawerNavigationProp<ScreenParams, "Settings">
    route: RouteProp<ScreenParams, 'Settings'>
}

const Drawer = createDrawerNavigator()

export function DrawerNavigator() {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        header: {
            backgroundColor: theme.colors.card
        },
        drawer: {
            backgroundColor: theme.colors.card,
        },
        icon: {
            color: theme.colors.text,
            ...theme.text.button,
            marginLeft: 10
        },
        label: {
            color: theme.colors.text,
            paddingVertical: 10,
            ...theme.text.button
        }
    })

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: styles.header,
                headerTintColor: theme.colors.text,
            }}
            drawerContentOptions={{
                activeTintColor: theme.colors.primary,
                labelStyle: styles.label,
            }}
        >
            {/*             
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerIcon: () => <FontAwesomeIcon icon="home" size={25} style={styles.icon} />
                }}
            /> 
            */}
            <Drawer.Screen
                name="Events"
                component={Events} /* initialParams={{ id: 324 }} */
                options={{
                    drawerIcon: () => <FontAwesomeIcon icon="calendar-alt" size={25} style={styles.icon} />
                }}
            />
            <Drawer.Screen
                name="AddEvent"
                component={AddEvent}
                options={{
                    title: "Add Event",
                    drawerIcon: () => <FontAwesomeIcon icon="calendar-plus" size={25} style={styles.icon} />
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerIcon: () => <FontAwesomeIcon icon="cog" size={25} style={styles.icon} />
                }}
            />
        </Drawer.Navigator>
    )
}