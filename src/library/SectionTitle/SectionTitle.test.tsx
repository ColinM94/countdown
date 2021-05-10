import * as React from "react"
import { render } from "@testing-library/react-native"
import { SectionTitle } from "./SectionTitle"
import { ThemeProvider } from "../../contexts/ThemeContext"

test("renders correctly", () => {
    const { getByText } = render(<SectionTitle title="Test Title" />, {
        wrapper: ThemeProvider,
    })
    getByText("Test Title")
})
