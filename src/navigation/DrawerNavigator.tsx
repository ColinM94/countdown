import * as React from "react"
import { StyleSheet } from "react-native"
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import { EventList, Settings } from "screens"
import { useTheme } from "contexts"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useNavigation } from '@react-navigation/native'
import { Pressable, IconButton } from "components"

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

    const styles = StyleSheet.create({
        header: {
            backgroundColor: theme.colors.card
        },
        headerTitle: {
            color: theme.colors.text,
            ...theme.text.h1 as {}
        },
        drawer: {
            backgroundColor: theme.colors.card,
        },
        drawerIcon: {
            ...theme.icon as {},
            marginLeft: 10
        },
        drawerLabel: {
            ...theme.text.body as {},
            paddingVertical: 15
        },
        icon: {
            color: theme.colors.text,
        },
        leftIcon: {
            marginLeft: 50
        },
        rightIcon: {
            marginRight: 5
        },
    })

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: styles.header,
                headerTintColor: theme.colors.text,
                headerTitleStyle: styles.headerTitle
            }}
            drawerContentOptions={{
                activeTintColor: theme.colors.primary,
                labelStyle: styles.drawerLabel,
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
                options={({ navigation }) => ({
                    title: "Events",
                    drawerIcon: () => <FontAwesomeIcon icon="calendar-alt" size={25} style={styles.drawerIcon} />,
                    headerRight: () =>
                        <IconButton
                            onPress={() => navigation.navigate("AddEvent")}
                            icon="plus"
                            containerStyle={styles.leftIcon}
                        />,
                    headerLeft: () =>
                        <IconButton
                            onPress={() => navigation.toggleDrawer()}
                            icon="bars"
                            containerStyle={styles.rightIcon}
                        />
                })}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerIcon: () => <FontAwesomeIcon icon="cog" size={25} style={styles.drawerIcon} />
                }}
            />
        </Drawer.Navigator>
    )
}