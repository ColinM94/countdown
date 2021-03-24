import * as React from "react"

type ThemeProviderProps = {
    children?: JSX.Element | JSX.Element[]
}

type Value = {
    theme: Theme,
    darkMode: boolean,
    setDarkMode: (darkMode: boolean) => void
}

type Theme = {
    colors: {
        primary: string,
        secondary: string,
        background: string,
        cardBackground: string,
        cardText: string
    }
    spacing: number
}

export const ThemeContext = React.createContext<Value>({} as Value)

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [darkMode, setDarkMode] = React.useState(false)

    const theme: Theme = {
        colors: {
            primary: "red",
            secondary: "blue",
            background: "#0f0f0f",
            cardBackground: "#262626",
            cardText: "white",
        },
        spacing: 10
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