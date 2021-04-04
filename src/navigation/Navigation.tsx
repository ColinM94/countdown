import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { StackNavigator } from "./StackNavigator"
import { useTheme } from "contexts"
import { Header } from "components"

export const Navigation = () => {
    const { theme } = useTheme()

    return (
        <NavigationContainer theme={theme}>
            <StackNavigator />
        </NavigationContainer>
    )
}
