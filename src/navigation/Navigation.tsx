import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { StackNavigator } from "./StackNavigator"

export const Navigation = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}
