import * as React from "react"
import { StyleSheet, Alert, Platform, ToastAndroid, ActivityIndicator } from "react-native"

type AppContextProps = {
    children?: React.ReactNode | React.ReactNode[]
}

interface State {
    /** On Android displays a toast message, on IOS displays an alert. */
    toast: (msg: string) => void
    //** While true shows a loading spinner at the center of the screen. */
    loading: (show: boolean) => void
}

export const AppContext = React.createContext({} as State)

export const useApp = (): State => {
    return React.useContext(AppContext)
}

export const AppProvider = ({ children }: AppContextProps) => {
    const [isLoading, setIsLoading] = React.useState(false)

    const toast = (msg: string) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
            return
        }
        Alert.alert("Alert", msg, [{ text: "OK", onPress: () => console.log("OK Pressed") }])
    }

    const loading = (active: boolean) => {
        setIsLoading(active)
    }

    const value: State = {
        toast,
        loading
    }

    return (
        <AppContext.Provider value={value}>
            {children}
            {isLoading && <ActivityIndicator size="large" color="red" style={styles.loading} />}
        </AppContext.Provider>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        top: "45%",
        left: "50%",
        right: "50%",
    }
})
