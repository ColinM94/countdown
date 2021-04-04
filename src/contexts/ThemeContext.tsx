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

type Theme = {
    dark: boolean,
    colors: {
        primary: string,
        secondary: string,
        background: string,
        card: string,
        text: string
        border: string,
        notification: string
    }
    text: {
        h1: StyleProp<TextStyle>,
        h2: StyleProp<TextStyle>,
        body: StyleProp<TextStyle>,
        label: StyleProp<TextStyle>,
        input: StyleProp<TextStyle>,
        button: StyleProp<TextStyle>,
        disabled: StyleProp<TextStyle>
    },
    spacing: number,
    elevation: number,
    borderRadius: number,
    header: {
        title: StyleProp<TextStyle>,
        icon: StyleProp<TextStyle>
    },
    drawer: {
        icon: StyleProp<TextStyle>,
    }
}

const ThemeContext = React.createContext<Value>({} as Value)

export const useTheme = () => {
    return React.useContext(ThemeContext)
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [darkMode, setDarkMode] = React.useState(true)

    const theme: Theme = {
        dark: darkMode,
        colors: {
            primary: darkMode ? "#2EA043" : "#2EA043",
            secondary: "blue",
            background: darkMode ? "#0f0f0f" : "white",
            card: darkMode ? "#1a1a1a" : "white",
            text: darkMode ? "white" : "black",
            border: 'white',
            notification: 'white',
        },
        text: {
            h1: {
                fontSize: 22,
                opacity: 0.80
            },
            h2: {
                fontSize: 21,
                opacity: 0.80
            },
            body: {
                fontSize: 20,
                opacity: 0.6
            },
            label: {
                fontSize: 15,
                opacity: 0.60
            },
            input: {
                fontSize: 20,
                opacity: 0.87,
            },
            button: {
                fontSize: 15,
                opacity: 0.87
            },
            disabled: {
                fontSize: 20,
                opacity: 0.38
            }
        },
        spacing: 10,
        elevation: 3,
        borderRadius: 3,
        header: {
            title: {
                opacity: 0.75,
            },
            icon: {
                opacity: 0.87,
            }
        },
        drawer: {
            icon: {
                opacity: 0.87,
            },
        }
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