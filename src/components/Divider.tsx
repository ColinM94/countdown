import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ThemeContext } from "contexts/ThemeContext"

const Divider = () => {
    const { theme } = React.useContext(ThemeContext)

    const styles = StyleSheet.create({
        root: {
            height: 1,
            width: "100%",
            backgroundColor: "white",
            marginTop: theme.spacing,
            marginBottom: theme.spacing
        },
    })

    return (
        <View style={styles.root} />
    )
}

export default Divider

