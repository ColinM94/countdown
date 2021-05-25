import * as React from "react"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { IconButton } from "library/IconButton"
import { Menu, MenuItem } from "library/Menu"
import { Header } from "library/Header"

export const EventsHeader = ({ navigation }) => {
    const [showMenu, setShowMenu] = React.useState(false)

    const menuItems: MenuItem[] = [
        {
            text: "New Event",
            leftIcon: "plus",
            onPress: () => navigation.navigate("Event"),
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

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const styles = StyleSheet.create({
        menuBtn: {
            marginLeft: "auto",
        },
    })

    return (
        <>
            <Header>
                <IconButton
                    icon="ellipsis-v"
                    style={styles.menuBtn}
                    onPress={toggleMenu}
                />
            </Header>

            <Menu items={menuItems} show={showMenu} setShow={setShowMenu} />
        </>
    )
}
