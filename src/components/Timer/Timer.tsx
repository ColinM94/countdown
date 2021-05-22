import * as React from "react"
import { StyleSheet, View, Text } from "react-native"

export const Timer = () => {
    const styles = StyleSheet.create({
        container: {},
        number: {
            fontSize: 64,
            color: "rgba(255,255,255,0.87)",
        },
        text: {
            fontSize: 36,
            color: "rgba(255,255,255,0.67)",
        },
    })

    const textProps = {
        adjustsFontSizeToFit: true,
        numberOfLines: 1,
    }

    return (
        <View style={styles.container}>
            <Text {...textProps}>
                <Text style={styles.number}>1 </Text>
                <Text style={styles.text}>Years</Text>
            </Text>

            <Text {...textProps}>
                <Text style={styles.number}>1 </Text>
                <Text style={styles.text}>Years</Text>
            </Text>

            <Text {...textProps}>
                <Text style={styles.number}>1 </Text>
                <Text style={styles.text}>Years</Text>
            </Text>

            <Text {...textProps}>
                <Text style={styles.number}>1 </Text>
                <Text style={styles.text}>Years</Text>
            </Text>

            <Text {...textProps}>
                <Text style={styles.number}>1 </Text>
                <Text style={styles.text}>Years</Text>
            </Text>
        </View>
    )
}
