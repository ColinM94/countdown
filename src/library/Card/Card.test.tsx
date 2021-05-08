import * as React from "react"
import { render, fireEvent } from '@testing-library/react-native'
import { Text, View } from "react-native"
import { ThemeProvider } from "contexts/ThemeContext"
import { Card } from "./Card"

const onPressMock = jest.fn()

test("render card with children and test onPress", () => {
    const { getByTestId, getByText } = render(
        <Card onPress={() => onPressMock("test")}>
            <View>
                <Text>Text 1</Text>
            </View>
            <View>
                <Text>Text 2</Text>
            </View>
        </Card>, 
        {wrapper: ThemeProvider}
    )

    fireEvent.press(getByTestId("card")) 
    expect(onPressMock).toHaveBeenCalledWith("test")
    expect(getByText("Text 1"))
    expect(getByText("Text 2"))
})
