import * as React from "react"
import { render } from "@testing-library/react-native"
import { Text } from "./Text"
import { ThemeProvider } from "../../contexts/ThemeContext"

test("renders correctly", () => {
    render(<Text />, {
        wrapper: ThemeProvider,
    })
})
