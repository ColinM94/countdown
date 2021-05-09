import * as React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { ColorPicker } from "./ColorPicker"

test("renders correctly and onPress colors work properly", () => {
    const mockFn = jest.fn()

    const { getByTestId } = render(
        <ColorPicker
            color={"red"}
            setColor={() => mockFn("newColor")}
            show={true}
            setShow={() => {}}
        />
    )

    expect(getByTestId("colorPicker"))
    expect(getByTestId("colorPicker.square-0"))
    expect(getByTestId("colorPicker.square-10"))

    fireEvent.press(getByTestId("colorPicker.square-0"))
    expect(mockFn).toBeCalledWith("newColor")
})
