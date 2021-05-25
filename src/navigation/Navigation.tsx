import * as React from "react"
import { StyleSheet, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import { useTheme } from "contexts/ThemeContext"
import { ScreenParams } from "./types"
import { useAuth } from "contexts/AuthContext"
import { Events } from "screens/Events"
import { Settings } from "screens/Settings"
import { Event } from "screens/Event"
import { Signin } from "screens/Signin"

// <..Params> adds Type checking for initialParams screen prop.
const Stack = createStackNavigator<ScreenParams>()

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
        },
    }

    const styles = StyleSheet.create({
        header: {
            elevation: 4,
        },
        headerIcon: {
            marginHorizontal: theme.spacing.secondary,
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
            paddingVertical: theme.spacing.primary,
        },
    })

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <NavigationContainer theme={navTheme}>
                <Stack.Navigator
                    screenOptions={({ navigation }) => ({
                        headerStyle: styles.header,
                        headerTitleStyle: theme.typography.h3,
                        headerShown: false,
                    })}
                >
                    {!currentUser.isSignedIn && (
                        <>
                            <Stack.Screen name="Signin" component={Signin} />
                        </>
                    )}
                    {currentUser.isSignedIn && (
                        <>
                            <Stack.Screen name="Events" component={Events} />
                            <Stack.Screen name="Event" component={Event} />
                            <Stack.Screen name="Settings" component={Settings} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}
