import * as React from "react"
import { StyleSheet, View } from "react-native"

interface HeaderProps {
    children: React.ReactNode | React.ReactNode[]
}

export const Header = ({ children }: HeaderProps) => {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 4,
        },
    })

    return <View style={styles.container}>{children}</View>
}
