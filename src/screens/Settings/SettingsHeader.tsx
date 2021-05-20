import * as React from "react"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Header } from "library/Header"
import { IconButton } from "library/IconButton"

export const SettingsHeader = () => {
    const navigation = useNavigation()

    const styles = StyleSheet.create({
        backBtn: {
            marginRight: "auto",
        },
    })

    return (
        <Header>
            <IconButton
                icon="arrow-left"
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
            />
        </Header>
    )
}
