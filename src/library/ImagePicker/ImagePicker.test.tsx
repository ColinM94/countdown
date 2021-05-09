import * as React from "react"
import { render } from "@testing-library/react-native"
import { ImagePicker } from "./ImagePicker"
import { ThemeProvider } from "../../contexts/ThemeContext"

test("renders correctly", () => {
    const { getByTestId } = render(<ImagePicker setImage={() => {}} />, {
        wrapper: ThemeProvider,
    })
})
