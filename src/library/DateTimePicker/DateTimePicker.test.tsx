import * as React from "react"
import { render } from '@testing-library/react-native'
import { DateTimePicker } from "./DateTimePicker"

test("render ColorPicker", () => {
    const { getByTestId } = render(
        <DateTimePicker 
            date={new Date()} 
            setDate={() => {}} 
            isVisible={true} 
            setIsVisible={() => {}}
        />
    )  

    expect(getByTestId("dateTimePicker"))
})