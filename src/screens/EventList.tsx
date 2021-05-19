import * as React from "react"
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    View,
    Text,
} from "react-native"
import { EventsProps } from "navigation/types"
import { useTheme } from "contexts/ThemeContext"
import { EventInfo } from "common/types"
import { formatDate } from "common/helpers"
import { useStore } from "contexts/StoreContext"
import { FAB } from "library/FAB"
import { Timer } from "components/Event/Timer"
import { FlatList } from "react-native-gesture-handler"
import { IconButton } from "library/IconButton"
import Constants from "expo-constants"
import { Menu, MenuItem } from "library/Menu"
import { Dimensions } from "react-native"

export const EventList = ({ navigation, route }: EventsProps) => {
    const { theme } = useTheme()
    const { events } = useStore()
    const windowWidth = Dimensions.get("window").width
    const [showMenu, setShowMenu] = React.useState(false)

    const menuItems: MenuItem[] = [
        {
            text: "New Event",
            leftIcon: "plus",
            onPress: () => navigation.navigate("EventDetails"),
            divider: true,
        },
        {
            text: "Settings",
            leftIcon: "cog",
            onPress: () => {
                navigation.navigate("Settings")
            },
        },
    ]

    const eventItem = ({ item }: { item: EventInfo }) => (
        <ImageBackground
            /*             source={require("assets/test2.png")} */
            style={[
                styles.listItem,
                { backgroundColor: item.color ?? theme.colors.card },
            ]}
        >
            <Pressable
                style={({ pressed }) => [
                    styles.listItemContent,
                    {
                        backgroundColor: pressed
                            ? "rgba(0,0,0,0.4)"
                            : "rgba(0,0,0,0.25)",
                    },
                ]}
                onPress={() =>
                    navigation.navigate("EventDetails", { eventInfo: item })
                }
            >
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>{formatDate(item.date)}</Text>
                <Timer
                    date={item.date}
                    fullText={false}
                    style={{ flexDirection: "row" }}
                    numberStyle={{ color: "rgba(255,255,255,0.75)" }}
                    letterStyle={{ color: "rgba(255,255,255,0.57)" }}
                />
            </Pressable>
        </ImageBackground>
    )

    const itemSeparator = () => <View style={styles.itemSeparator} />

    const styles = StyleSheet.create({
        header: {
            paddingHorizontal: theme.spacing.primary,
            paddingTop: Constants.statusBarHeight + 4,
            paddingBottom: 4,
            flexDirection: "row",
        },
        headerLeftBtn: {
            marginRight: "auto",
        },
        headerRightBtn: {
            marginLeft: "auto",
        },
        list: {
            padding: theme.spacing.primary,
            paddingTop: 4,
            paddingBottom: theme.spacing.primary,
        },
        listItem: {
            borderRadius: theme.roundness,
            height: 150,
            width:
                windowWidth / 2 -
                theme.spacing.primary -
                theme.spacing.primary / 2,
        },
        listItemContent: {
            backgroundColor: "rgba(0,0,0,0.25)",
            padding: theme.spacing.primary,
            flex: 1,
        },
        itemSeparator: {
            height: theme.spacing.primary,
            width: theme.spacing.primary,
        },
        name: {
            fontSize: 24,
            color: "rgba(255,255,255,0.87)",
        },
        date: {
            fontSize: 16,
            color: "rgba(255,255,255,0.64)",
            marginTop: "auto",
        },
    })

    return (
        <>
            <View style={styles.header}>
                <IconButton
                    icon="ellipsis-v"
                    style={styles.headerRightBtn}
                    onPress={() => setShowMenu(!showMenu)}
                />
            </View>

            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={eventItem}
                ListEmptyComponent={itemSeparator}
                style={styles.list}
                numColumns={2}
                ItemSeparatorComponent={itemSeparator}
                columnWrapperStyle={{ justifyContent: "space-between" }}
            />

            <Menu show={showMenu} setShow={setShowMenu} items={menuItems} />

            {/*             <FAB
                onPress={() => navigation.navigate("EventDetails")}
                icon="plus"
            /> */}
        </>
    )
}
