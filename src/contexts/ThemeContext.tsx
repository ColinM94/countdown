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
    text: {
        h1: {
            fontSize: number,
            opacity: number
        },
        h2: {
            fontSize: number,
            opacity: number
        },
        body: {
            fontSize: number,
            opacity: number
        },
        label: {
            fontSize: number,
            opacity: number
        },
        input: {
            fontSize: number,
            opacity: number,
        },
        button: {
            fontSize: number,
            opacity: number
        },
        disabled: {
            fontSize: number,
            opacity: number
        }
    },
    spacing: number,
    elevation: number,
    borderRadius: number
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
                fontSize: 28,
                opacity: 0.87
            },
            h2: {
                fontSize: 25,
                opacity: 0.87
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
        borderRadius: 3
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