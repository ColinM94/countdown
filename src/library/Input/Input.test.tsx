import * as React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { Input } from "./Input"
import { ThemeProvider } from "../../contexts/ThemeContext"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const onPressMock = jest.fn()

test("Render Input correctly and onPress works.", () => {
    const { getByTestId, getByPlaceholderText } = render(
        <Input
            onPress={() => onPressMock("inputPressed")}
            rightIconOnPress={() => onPressMock("rightIconPressed")}
            placeholder="placeholder"
            leftIcon={faPlus}
            rightIcon={faPlus}
            label="label"
        />,
        { wrapper: ThemeProvider }
    )

    expect(getByTestId("input"))
    expect(getByTestId("inputField"))
    expect(getByTestId("rightIconBtn"))
    expect(getByTestId("rightIcon"))
    expect(getByTestId("leftIcon"))
    expect(getByPlaceholderText("placeholder"))
    expect(getByTestId("label"))

    fireEvent.press(getByTestId("input"))
    expect(onPressMock).toHaveBeenCalledWith("inputPressed")
})

test("Right icon onPress works correctly.", () => {
    const { getByTestId } = render(
        <Input
            rightIcon={faPlus}
            rightIconOnPress={() => onPressMock("rightIconPressed")}
        />,
        { wrapper: ThemeProvider }
    )

    fireEvent.press(getByTestId("rightIconBtn"))
    expect(onPressMock).toHaveBeenCalledWith("rightIconPressed")
})
/* 
test("User input handled correctly.", () => {
    const { getByTestId, getAllByText } = render(<Input />, {
        wrapper: ThemeProvider,
    })

    fireEvent.changeText(getByTestId("inputField"), "test")
    const text = getAllByText("test")
    expect(text).toHaveLength(1)
})
 */
