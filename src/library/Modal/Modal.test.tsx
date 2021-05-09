import * as React from "react"
import { render } from "@testing-library/react-native"
import { Modal } from "./Modal"
import { ThemeProvider } from "../../contexts/ThemeContext"
import { View, Text } from "react-native"

test("Render correctly", () => {
    const { getByText } = render(
        <Modal show={true} setShow={() => {}}>
            <View>
                <Text>Test Text</Text>
            </View>
        </Modal>,
        {
            wrapper: ThemeProvider,
        }
    )
    getByText("Test Text")
})
