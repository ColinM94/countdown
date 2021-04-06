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
    text: {
        main: string,
        primary: string,
        secondary: string,
        tertiary: string
    }
}

type Theme = {
    dark: boolean,
    colors: {
        primary: string,
        secondary: string,
        background: string,
        card: string,
        text: {
            main: string,
            primary: string,
            secondary: string,
            tertiary: string,
        }
    },
    font: {
        h1: {
            fontSize: number
        },
        h2: {
            fontSize: number
        },
        body: {
            fontSize: number
        },
        subtitle: {
            fontSize: number
        }
    },
    typography: {
        h1: StyleProp<TextStyle>,
        h2: StyleProp<TextStyle>,
        h3: StyleProp<TextStyle>,
        subtitle: StyleProp<TextStyle>,
        body: StyleProp<TextStyle>,
        button: StyleProp<TextStyle>,
        caption: StyleProp<TextStyle>,
        overline: StyleProp<TextStyle>
    },
    spacing: (factor?: number | "outer" | "inner" | "row") => number,
    elevation: number,
    borderRadius: number,

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
        background: darkMode ? "#121212" : "#EEEEEE",
        card: darkMode ? "#272727" : "white",
        text: {
            main: darkMode ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.87)",
            primary: darkMode ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
            secondary: darkMode ? 'rgba(255, 255, 255, 0.54)' : 'rgba(0, 0, 0, 0.54)',
            tertiary: darkMode ? 'rgba(255, 255, 255, 0.38)' : 'rgba(0, 0, 0, 0.38)',
        }
    }

    const theme: Theme = {
        dark: darkMode,
        colors: colors,
        font: {
            h1: {
                fontSize: 24
            },
            h2: {
                fontSize: 20
            },
            body: {
                fontSize: 16
            },
            subtitle: {
                fontSize: 14
            }
        },
        typography: {
            h1: {
                fontSize: 26,
                letterSpacing: 0.25,
                color: colors.text.primary,
            },
            h2: {
                fontSize: 22,
                letterSpacing: 0,
                color: colors.text.primary,
            },
            h3: {
                fontSize: 19,
                letterSpacing: 0.15,
                color: colors.text.primary
            },
            subtitle: {
                fontSize: 14,
                letterSpacing: 0.15,
                color: colors.text.secondary
            },
            body: {
                fontSize: 16,
                letterSpacing: 0.5,
                color: colors.text.primary,
            },
            button: {
                fontSize: 14,
                letterSpacing: 1.25,
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.87)'
            },
            caption: {
                fontSize: 16,
                letterSpacing: 0.5,
                color: colors.text.secondary
            },
            overline: {
                fontSize: 13,
                letterSpacing: 1.5,
                color: colors.text.secondary
            }
        },
        spacing: (factor) => {
            if (factor === "outer") return 10
            else if (factor === "inner") return 8
            else if (factor === "row") return 8
            return 8 * (factor ?? 1)
        },
        elevation: 1,
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