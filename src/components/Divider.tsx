import * as React from "react"
import { View, StyleSheet } from "react-native"
import { useTheme } from "contexts"

type Props = {

}

export const Divider = ({ }: Props) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        root: {
            height: 1,
            width: "100%",
            backgroundColor: "white",
            /*             marginTop: theme.spacing,
                        marginBottom: theme.spacing() */
        },
    })

    return (
        <View style={styles.root} />
    )
}

