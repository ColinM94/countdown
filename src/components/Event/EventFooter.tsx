import * as React from "react"
import { StyleSheet, View, Text } from "react-native"

export const EventFooter = () => {
    const styles = StyleSheet.create({
        container: {
            height: 50,
            justifyContent: "center",
            alignItems: "center",
        },
    })

    return (
        <View style={styles.container}>
            <Text style={{ color: "white" }}>Footer</Text>
        </View>
    )
}
