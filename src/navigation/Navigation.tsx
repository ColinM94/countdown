import * as React from "react"
import { StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer"
import { NavigationContainer, RouteProp } from "@react-navigation/native"

import { AddEvent, EditEvent, EventDetails, EventList, Settings } from "screens"
import { IconButton } from "components"
import { useTheme } from "contexts"

import { ScreenParams } from "./types"

// <..Params> adds Type checking for initialParams screen prop. 
const Stack = createStackNavigator<ScreenParams>()
const Drawer = createDrawerNavigator<ScreenParams>()

export const Navigation = () => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        header: {
            backgroundColor: theme.colors.card
        },
        headerIcon: {
            marginHorizontal: 5
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
    })

    const drawerNavigator = () => (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerTintColor: theme.colors.text,
                headerTitleStyle: styles.headerTitle
            }}
            drawerContentOptions={{
                activeTintColor: theme.colors.primary,
                labelStyle: styles.drawerLabel,
            }}
        >
            <Drawer.Screen
                name="EventList"
                component={EventList}
                options={({ navigation }) => ({
                    title: "Events",
                    drawerIcon: () => <FontAwesomeIcon icon="calendar-alt" size={25} style={styles.drawerIcon} />,
                    headerRight: () => <IconButton onPress={() => navigation.navigate("AddEvent")} icon="plus" containerStyle={styles.headerIcon} />,
                    headerLeft: () => <IconButton onPress={() => navigation.toggleDrawer()} icon="bars" containerStyle={styles.headerIcon} />
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

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={({ navigation }) => ({
                    headerLeft: () => <IconButton icon="arrow-left" onPress={() => navigation.goBack()} containerStyle={styles.headerIcon} />,
                    headerTintColor: theme.colors.text,
                    headerTitleStyle: styles.headerTitle
                })}
            >
                <Stack.Screen
                    name="Drawer"
                    component={drawerNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EventDetails"
                    component={EventDetails}
                    options={{
                        title: "Event Details",
                    }}
                />
                <Stack.Screen
                    name="AddEvent"
                    component={AddEvent}
                    options={{
                        title: "Add Event"
                    }}
                />
                <Stack.Screen
                    name="EditEvent"
                    component={EditEvent}
                    options={{
                        title: "Update Event"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
