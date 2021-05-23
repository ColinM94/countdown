import * as React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Timer } from "components/Timer"
import { Dimensions } from "react-native"

export const EventCountdown = () => {
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height

    const calculateFontSize = (fontSize: number) => {
        if (windowHeight < 400) return fontSize * 0.3
        else if (windowHeight < 500) return fontSize * 0.4
        else if (windowHeight < 600) return fontSize * 0.5
        else if (windowHeight < 700) return fontSize * 0.6
        else if (windowHeight < 800) return fontSize * 0.7
        else if (windowHeight < 900) return fontSize * 0.8
        else if (windowHeight < 1000) return fontSize * 0.9
        else return fontSize
    }

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            flex: 1,
        },
        numbers: {
            fontSize: calculateFontSize(84),
            color: "rgba(255,255,255,0.87)",
        },
        text: {
            fontSize: calculateFontSize(40),
            color: "rgba(255,255,255,0.6)",
        },
    })

    const textProps = {
        adjustsFontSizeToFit: true,
    }

    return (
        <View style={styles.container}>
            <Timer
                date={new Date("December 17, 1995 03:24:00")}
                style={styles.container}
                numberStyle={styles.numbers}
                textStyle={styles.text}
                direction="column"
                precision={1}
            />
        </View>
    )
}
