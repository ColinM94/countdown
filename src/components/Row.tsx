import * as React from "react"
import { View } from "react-native"

type Props = {
    children?: JSX.Element | JSX.Element[],
}

export const Row = ({ children }: Props) => {
    return (
        <View style={{ flexDirection: "row" }}>
            {children}
        </View>
    )
}