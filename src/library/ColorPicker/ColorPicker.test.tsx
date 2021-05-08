import * as React from "react"
import { render } from '@testing-library/react-native'
import { ColorPicker } from "./ColorPicker"

test("render ColorPicker", () => {
    const { getByTestId } = render(<ColorPicker color={"red"} setColor={() => {}} show={true} setShow={() => {}}/>)  

    expect(getByTestId("colorPicker"))
    expect(getByTestId("colorPicker.square-0"))
    expect(getByTestId("colorPicker.square-1"))
})