import * as React from "react"
import { StyleSheet, useWindowDimensions, View } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps, DrawerItem } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

import { AddEvent, EditEvent, EventDetails, EventList, Settings } from "screens"
import { IconButton, Text } from "components"
import { useTheme } from "contexts"

import { ScreenParams } from "./types"

// <..Params> adds Type checking for initialParams screen prop. 
const Stack = createStackNavigator<ScreenParams>()
const Drawer = createDrawerNavigator<ScreenParams>()

export const Navigation = () => {
    const { theme, darkMode } = useTheme()
    const dimensions = useWindowDimensions()

    const drawerIconSize = 25

    const navTheme = {
        dark: darkMode,
        colors: {
            primary: theme.colors.primary,
            background: theme.colors.background,
            card: theme.colors.card,
            text: theme.colors.text.main,
            border: theme.colors.card,
            notification: theme.colors.secondary,
        }
    }

    const styles = StyleSheet.create({
        header: {
            elevation: 4,
        },
        headerIcon: {
            color: theme.colors.text.main,

        },
        headerTitle: {
            color: theme.colors.text.main,
        },
        drawer: {
            backgroundColor: theme.colors.card,
        },
        drawerTitle: {
            color: theme.colors.text.main,
            fontSize: theme.font.h1.fontSize,
            marginLeft: theme.spacing(3) + 2,
            marginTop: theme.spacing(),
            marginBottom: theme.spacing(2),
        },
        drawerIcon: {
            color: theme.colors.text.secondary,
            marginLeft: theme.spacing(),
        },
        drawerLabel: {
            color: theme.colors.text.main,
            paddingVertical: theme.spacing()
        },
    })

    const drawerNavigator = () => (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerShown: true,
                headerTitleStyle: styles.headerTitle,
                headerStyle: styles.header,
                headerLeft: () => <IconButton onPress={() => navigation.toggleDrawer()} icon="bars" iconStyle={styles.headerIcon} containerStyle={{ marginLeft: theme.spacing() }} />,
            })}
            drawerType="slide"
            /* drawerType={dimensions.width >= 768 ? 'permanent' : 'front'} */
            /* openByDefault={dimensions.width >= 768 ? true : false} */
            drawerStyle={styles.drawer}
            drawerContent={drawerContent}
            drawerContentOptions={{
                labelStyle: styles.drawerLabel,
            }}
        >
            <Drawer.Screen
                name="EventList"
                component={EventList}
                options={({ navigation }) => ({
                    title: "My Events",
                    drawerIcon: () => <FontAwesomeIcon icon="calendar-alt" size={drawerIconSize} style={styles.drawerIcon} />,
                    headerRight: () => <IconButton onPress={() => navigation.navigate("AddEvent")} icon="plus" iconStyle={styles.headerIcon} containerStyle={{ marginRight: theme.spacing() }} />,
                })}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerIcon: () => <FontAwesomeIcon icon="cog" size={drawerIconSize} style={styles.drawerIcon} />
                }}
            />
        </Drawer.Navigator>
    )

    const drawerContent = (props: DrawerContentComponentProps) => (
        <DrawerContentScrollView {...props}>
            <Text style={styles.drawerTitle}>Events App</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <NavigationContainer theme={navTheme}>
                <Stack.Navigator
                    screenOptions={({ navigation }) => ({
                        headerStyle: styles.header,
                        headerTitleStyle: styles.headerTitle,
                        headerLeft: () => <IconButton icon="arrow-left" onPress={() => navigation.goBack()} iconStyle={styles.headerIcon} containerStyle={{ marginLeft: theme.spacing() }} />,
                        /*                animationEnabled: false, */
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
                            title: "New Event"
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
            </NavigationContainer >
        </View>

    )
}
