import * as React from "react"
import { StyleSheet, View } from "react-native"
import { EventsProps } from "navigation/types"
import { useTheme } from "contexts/ThemeContext"
import { Card } from "library/Card"
import { Text } from "library/Text"
import { EventInfo } from "common/types"
import { formatDate, formatTime } from "common/helpers"
import { useStore } from "contexts/StoreContext"
import { ListView } from "library/ListView"
import { FAB } from "library/FAB"
import { Timer } from "components/Event/Timer"

export const EventList = ({ navigation, route }: EventsProps) => {
    const { theme } = useTheme()
    const { events } = useStore()

    const styles = StyleSheet.create({
        card: {
            flexDirection: "row",
            padding: 0,
            marginBottom: 0,
            alignItems: "center",
            justifyContent: "center",
        },
        cardContent: {
            backgroundColor: "rgba(0,0,0,0.25)",
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 12,
            flexDirection: "row",
        },
        leftContent: {},
        chevron: {
            marginLeft: "auto",
        },
        timerStyle: {},
        timerNumbers: {
            fontSize: 32,
            color: "rgba(255,255,255,0.64)",
            paddingRight: 20,
        },
        timerLetters: {
            fontSize: 20,
            color: "rgba(255,255,255,0.64)",
        },
    })

    const eventItem = ({ item }: { item: EventInfo }) => (
        <Card
            style={[
                styles.card,
                { backgroundColor: item.color ?? theme.colors.card },
            ]}
            onPress={() =>
                navigation.navigate("EventDetails", { eventInfo: item })
            }
        >
            <View style={styles.cardContent}>
                <View>
                    <Text h3>{item.name}</Text>
                    <Text subtitle>{formatDate(item.date)}</Text>
                </View>
            </View>

            {/*             <Text adjustsFontSizeToFit>
                    <Timer date={item.date} style={styles.timerStyle} textStyle={styles.timerTextStyle} numberStyle={styles.timerNumberStyle} letterStyle={styles.timerLetterStyle} />  
                </Text> */}
        </Card>
    )

    return (
        <>
            <ListView data={events} renderItem={eventItem} />
            <FAB
                onPress={() => navigation.navigate("EventDetails")}
                icon="plus"
            />
        </>
    )
}
