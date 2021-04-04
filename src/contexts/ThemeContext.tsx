import * as React from "react"
import { StyleProp, TextStyle } from "react-native"

type ThemeProviderProps = {
    children?: JSX.Element | JSX.Element[]
}

type Value = {
    theme: Theme,
    darkMode: boolean,
    setDarkMode: (darkMode: boolean) => void
}

type Colors = {
    primary: string,
    secondary: string,
    background: string,
    card: string,
    text: string
    border: string,
    notification: string
}

type Theme = {
    dark: boolean,
    colors: Colors,
    text: {
        h1: StyleProp<TextStyle>,
        h2: StyleProp<TextStyle>,
        body: StyleProp<TextStyle>,
        subtitle: StyleProp<TextStyle>,
        label: StyleProp<TextStyle>,
        input: StyleProp<TextStyle>,
        button: StyleProp<TextStyle>,
        disabled: StyleProp<TextStyle>,
    },
    spacing: number,
    elevation: number,
    borderRadius: number,
    icon: StyleProp<TextStyle>
}

const ThemeContext = React.createContext<Value>({} as Value)

export const useTheme = () => {
    return React.useContext(ThemeContext)
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [darkMode, setDarkMode] = React.useState(true)

    const colors: Colors = {
        primary: darkMode ? "#2EA043" : "#2EA043",
        secondary: "blue",
        background: darkMode ? "#0f0f0f" : "white",
        card: darkMode ? "#1a1a1a" : "white",
        text: darkMode ? "white" : "black",
        border: 'white',
        notification: 'white',
    }

    const theme: Theme = {
        dark: darkMode,
        colors: colors,
        text: {
            h1: {
                fontSize: 22,
                opacity: 0.87,
                color: colors.text
            },
            h2: {
                fontSize: 20,
                opacity: 0.87,
                color: colors.text
            },
            body: {
                fontSize: 16,
                opacity: 0.80,
                color: colors.text
            },
            subtitle: {
                fontSize: 14,
                opacity: 0.7,
                color: colors.text
            },
            label: {
                fontSize: 15,
                opacity: 0.60,
                color: colors.text
            },
            input: {
                fontSize: 20,
                opacity: 0.87,
                color: colors.text
            },
            button: {
                fontSize: 15,
                opacity: 0.87,
                color: colors.text
            },
            disabled: {
                fontSize: 20,
                opacity: 0.38,
                color: colors.text
            }
        },
        icon: {
            opacity: 0.9,
            color: colors.text
        },
        spacing: 8,
        elevation: 3,
        borderRadius: 3,
    }

    const value: Value = {
        theme,
        darkMode,
        setDarkMode
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}