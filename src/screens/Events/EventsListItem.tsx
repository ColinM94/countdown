import * as React from "react"
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Pressable,
    ImageBackground,
} from "react-native"
import { EventInfo } from "common/types"
import { useTheme } from "contexts/ThemeContext"
import { formatDate } from "common/helpers"
import { useNavigation } from "@react-navigation/native"

interface ListItemProps {
    eventInfo: EventInfo
}

export const EventsListItem = ({ eventInfo }: ListItemProps) => {
    const { theme } = useTheme()
    const navigation = useNavigation()
    const windowWidth = Dimensions.get("window").width

    const handlePress = () => {
        navigation.navigate("Event", { eventInfo })
    }

    const styles = StyleSheet.create({
        outer: {
            borderRadius: theme.roundness,
            width:
                windowWidth / 2 -
                theme.spacing.primary -
                theme.spacing.primary / 2,
            height: 150,
            backgroundColor: eventInfo.color ?? theme.colors.card,
        },
        inner: {
            flexDirection: "row",
            padding: 12,
            height: "100%",
            width: "100%",
        },
        name: {
            color: "rgba(255,255,255,0.87)",
            fontSize: theme.typography.h1.fontSize,
        },
        date: {
            marginTop: "auto",
            color: "rgba(255,255,255,0.57)",
            fontSize: theme.typography.subtitle.fontSize,
        },
    })

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? styles.outer.backgroundColor
                        : "white",
                },
                styles.outer,
            ]}
        >
            {({ pressed }) => (
                <ImageBackground
                    style={[
                        styles.inner,
                        {
                            backgroundColor: pressed
                                ? "rgba(0,0,0,0.35)"
                                : "rgba(0,0,0,0.25)",
                        },
                    ]}
                    source={eventInfo?.image && require("assets/test2.png")}
                >
                    <View>
                        <Text style={styles.name}>{eventInfo.name}</Text>
                        <Text style={styles.date}>
                            {formatDate(eventInfo.date)}
                        </Text>
                    </View>
                </ImageBackground>
            )}
        </Pressable>
    )
}
