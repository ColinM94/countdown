import * as React from "react"
import { ActivityIndicator, StyleSheet, View, Dimensions } from "react-native"

type LoadingProviderProps = {
    children: JSX.Element | JSX.Element[]
}

type Value = {
    startLoading: () => void,
    endLoading: () => void
}

const LoadingContext = React.createContext<Value>({} as Value)

export const useLoading = () => {
    return React.useContext(LoadingContext)
}

export function LoadingProvider({ children }: LoadingProviderProps) {
    const [loading, setLoading] = React.useState(false)

    const startLoading = () => {
        setLoading(true)
    }

    const endLoading = () => {
        setLoading(false)
    }

    const value: Value = {
        startLoading,
        endLoading
    }

    const styles = StyleSheet.create({
        loading: {
            position: 'absolute',
            top: "45%",
            left: "50%",
            right: "50%",
        }
    })

    return (
        <LoadingContext.Provider value={value}>
            {children}
            {loading && <ActivityIndicator size="large" color="red" style={styles.loading} />}
        </LoadingContext.Provider>
    )
}

