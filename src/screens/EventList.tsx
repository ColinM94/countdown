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
import { Card } from "library/Card"
import { EventInfo } from "common/types"
import { formatDate, formatTime } from "common/helpers"
import { useStore } from "contexts/StoreContext"
import { ListView } from "library/ListView"
import { FAB } from "library/FAB"
import { Timer } from "components/Event/Timer"
import { FlatList } from "react-native-gesture-handler"
import { IconButton } from "library/IconButton"
import Constants from "expo-constants"
import { Menu, MenuItem } from "library/Menu"
import { Event } from "components/Event"
import { Dimensions } from "react-native"
import { Icon } from "library/Icon"

export const EventList = ({ navigation, route }: EventsProps) => {
    const { theme } = useTheme()
    const { events } = useStore()
    const windowWidth = Dimensions.get("window").width
    const [showMenu, setShowMenu] = React.useState(false)

    const menuItems: MenuItem[] = [
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
            /*            source={require("assets/test2.png")} */
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
            paddingTop: 8,
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

    const lastItem = () => (
        <View style={[styles.listItem, { backgroundColor: "gold" }]}>
            <Pressable
                style={({ pressed }) => [
                    styles.listItem,
                    {
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: pressed
                            ? "rgba(0,0,0,0.4)"
                            : "rgba(0,0,0,0.25)",
                    },
                ]}
                onPress={() => {
                    navigation.navigate("EventDetails")
                }}
            >
                <Icon icon="plus" color="white" size={40} />
            </Pressable>
        </View>
    )

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
                columnWrapperStyle={{ justifyContent: "space-between" }}
                ListHeaderComponent={lastItem}
            />

            <Menu show={showMenu} setShow={setShowMenu} items={menuItems} />

            <FAB
                onPress={() => navigation.navigate("EventDetails")}
                icon="plus"
            />
        </>
    )
}
