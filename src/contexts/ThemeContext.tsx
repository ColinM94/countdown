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
    spacing: number
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
            primary: "red",
            secondary: "blue",
            background: darkMode ? "#0f0f0f" : "white",
            card: darkMode ? "#242424" : "white",
            text: darkMode ? "white" : "black",
            border: 'white',
            notification: 'white',
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