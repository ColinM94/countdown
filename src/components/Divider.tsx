import * as React from "react"
import { View, StyleSheet } from "react-native"
import { useTheme } from "contexts"

type Props = {

}

export const Divider = ({ }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        divider: {
            height: 1,
            width: "80%",
            backgroundColor: "white",
            opacity: 0.4,
            marginVertical: theme.spacing()
        },
    })

    return (
        <View style={styles.divider} />
    )
}

