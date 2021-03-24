import * as React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { ThemeContext } from "contexts/ThemeContext"

type Props = {
    children?: JSX.Element | JSX.Element[],
}

const ContentView = ({ children }: Props) => {
    const { theme } = React.useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            minHeight: "100%",
            padding: theme.spacing / 2
        }
    })

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            {children}
        </ScrollView>
    )
}

export default ContentView