import * as React from "react"
import { render } from "@testing-library/react-native"
import { ScreenView } from "./ScreenView"
import { ThemeProvider } from "../../contexts/ThemeContext"
import { View, Text } from "react-native"

test("renders correctly", () => {
    const { getByText } = render(
        <ScreenView>
            <View>
                <Text>Test Text</Text>
            </View>
        </ScreenView>,
        {
            wrapper: ThemeProvider,
        }
    )
    getByText("Test Text")
})
