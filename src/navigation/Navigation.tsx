import * as React from "react"
import { StyleSheet, useWindowDimensions, View } from "react-native"
import { Icon } from "library/Icon"

import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps, DrawerItem } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

import { useTheme } from "contexts/ThemeContext"
import { IconButton } from "library/IconButton"
import { Text } from "library/Text"

import { ScreenParams } from "./types"
import { EventList } from "screens/EventList"
import { Settings } from "screens/Settings"
import { EventDetails } from "screens/EventDetails"
import { AddEvent } from "screens/AddEvent"
import { EditEvent } from "screens/EditEvent"
import { useAuth } from "contexts/AuthContext"
import { Signin } from "screens/Signin"
import { Pressable } from "library/Pressable"

// <..Params> adds Type checking for initialParams screen prop. 
const Stack = createStackNavigator<ScreenParams>()
const Drawer = createDrawerNavigator<ScreenParams>()

export const Navigation = () => {
    const { theme, isDark } = useTheme()
    const { currentUser } = useAuth()

    const navTheme = {
        dark: isDark,
        colors: {
            primary: theme.colors.primary,
            background: theme.colors.background,
            card: theme.colors.card,
            text: theme.colors.text.primary,
            border: theme.colors.card,
            notification: theme.colors.secondary,
        }
    }

    const styles = StyleSheet.create({
        header: {
            elevation: 4,
        },
        headerIcon: {
            marginHorizontal: theme.spacing.secondary
        },
        drawer: {
            backgroundColor: theme.colors.card,
        },
        drawerTitle: {
            flexDirection: "row",
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 16,
        },
        drawerIcon: {
            color: theme.colors.text.secondary,
            marginLeft: theme.spacing.primary,
        },
        drawerLabel: {
            color: theme.colors.text.primary,
            paddingVertical: theme.spacing.primary
        },
    })

    const drawerNavigator = () => (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerShown: true,
                headerTitleStyle: theme.typography.h3,
                headerStyle: styles.header,
                headerLeft: () => <IconButton onPress={() => navigation.toggleDrawer()} icon="bars" style={styles.headerIcon} />,
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
                    drawerIcon: () => <Icon icon="calendar-alt" size={theme.icon.size} style={styles.drawerIcon} />,
/*                     headerRight: () => <IconButton onPress={() => navigation.navigate("AddEvent")} icon="plus" style={styles.headerIcon} />, */ 
               })}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    drawerIcon: () => <Icon icon="cog" size={theme.icon.size} style={styles.drawerIcon} />
                }}
            />
        </Drawer.Navigator>
    )

    const drawerContent = (props: DrawerContentComponentProps) => (
        <DrawerContentScrollView {...props}>
            <Pressable style={styles.drawerTitle}>
                <View style={{justifyContent: "center", marginRight: theme.spacing.primary}}>
                    <Icon icon="clock" size={32} color={theme.colors.primary}/>
                </View>
                <View>
                    <Text h1 style={{fontSize: 24}}>Countdown</Text>
                    <Text subtitle>Track your important events</Text> 
                </View>
            </Pressable>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <NavigationContainer theme={navTheme}>
                <Stack.Navigator
                    screenOptions={({ navigation }) => ({
                        headerStyle: styles.header,
                        headerTitleStyle: theme.typography.h3,
                        headerLeft: () => <IconButton icon="arrow-left" onPress={() => navigation.goBack()} style={styles.headerIcon} />,
                    
                    })}
                >
                    { !currentUser.isSignedIn &&
                        <>
                            <Stack.Screen
                                name="Drawer"
                                component={Signin}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </>
                    }
                    {
                        currentUser.isSignedIn && 
                        <>
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
                                    headerShown: false
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
                                    title: "Update Event",
                                    
                                }}
                            />
                        </>
                    }        
                </Stack.Navigator>
            </NavigationContainer >
        </View>
    )
}
