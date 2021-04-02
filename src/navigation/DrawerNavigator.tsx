import * as React from "react"
import { StyleSheet } from "react-native"
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import { EventList, Settings } from "screens"
import { useTheme } from "contexts"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useNavigation } from '@react-navigation/native'
import { Pressable } from "components"

type ScreenParams = {
    Home: undefined,
    EventList: undefined,
    AddEvent: undefined,
    Settings: undefined
}

export type HomeProps = {
    navigation: DrawerNavigationProp<ScreenParams, 'Home'>,
    route: RouteProp<ScreenParams, 'Home'>
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

const Drawer = createDrawerNavigator()

export function DrawerNavigator() {
    const { theme } = useTheme()
    const navigation = useNavigation()

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
        },
        rightIcon: {
            marginRight: 15,
            padding: 10,
            borderRadius: 50,
            overflow: "hidden"
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
                name="EventList"
                component={EventList} /* initialParams={{ id: 324 }} */
                options={{
                    title: "Events",
                    drawerIcon: () => <FontAwesomeIcon icon="calendar-alt" size={25} style={styles.icon} />,
                    headerRight: () =>
                        <Pressable onPress={() => navigation.navigate("AddEvent")} style={[styles.rightIcon]}>
                            <FontAwesomeIcon icon="plus" size={23} style={styles.icon} />
                        </Pressable>
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