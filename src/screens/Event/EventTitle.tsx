import * as React from "react"
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native"
import { formatDate, formatTime } from "common/helpers"
import { useEvent } from "./Event"
import { Pressable } from "library/Pressable"

export const EventTitle = () => {
    const { name, setName, date } = useEvent()
    const { windowWidth } = Dimensions

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
        },
        name: {
            color: "rgba(255,255,255,0.87)",
            fontSize: 64,
        },
        date: {
            color: "rgba(255,255,255,0.70)",
            fontSize: 32,
        },
        time: {
            color: "rgba(255,255,255,0.70)",
            fontSize: 24,
        },
    })

    return (
        <View style={styles.container}>
            <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
                {name}
            </Text>
            {/*             <TextInput
                value={name}
                onChangeText={setName}
                style={{
                    fontSize: 48,
                    color: "rgba(255,255,255,0.87)",
                    flexWrap: "wrap",
                    maxWidth: windowWidth,
                }}
                allowFontScaling={true}
                numberOfLines={1}
            /> */}
            <Pressable>
                <Text style={styles.date} numberOfLines={1} adjustsFontSizeToFit>
                    {formatDate(date)}
                </Text>
            </Pressable>
            <Text style={styles.time} numberOfLines={1} adjustsFontSizeToFit>
                {formatTime(date)}
            </Text>
        </View>
    )
}
