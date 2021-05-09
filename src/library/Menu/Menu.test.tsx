import * as React from "react"
import { render } from "@testing-library/react-native"
import { Item, Menu } from "./Menu"
import { ThemeProvider } from "../../contexts/ThemeContext"
import { faPlus, faPallet } from "@fortawesome/free-solid-svg-icons"

test("Render correctly", () => {
    const items: Item[] = [
        {
            text: "test",
            onPress: () => {},
            leftIcon: faPlus,
            divider: true,
        },
        {
            text: "test2",
            onPress: () => {},
            leftIcon: faPallet,
            divider: true,
        },
    ]

    render(<Menu items={items} isVisible={true} setIsVisible={() => {}} />, {
        wrapper: ThemeProvider,
    })
})
