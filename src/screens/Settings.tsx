import * as React from "react"
import { StyleSheet, View, Switch, ScrollView } from "react-native"
import { SettingsProps } from "navigation/types"
import { useTheme } from "contexts/ThemeContext"
import { ScreenView } from "library/ScreenView"
import { Text } from "library/Text"
import { Card } from "library/Card"
import { signOut } from "api/auth"
import { Icon } from "library/Icon"
import { Picker } from "library/Picker"
import { addDateFormat, updateUser } from "api/firestore"
import { useAuth } from "contexts/AuthContext"
import { useApp } from "contexts/AppContext"
import { IconButton } from "library/IconButton"
import Constants from "expo-constants"

const options = [
    {
        text: "dd/mm/yy",
        value: "dd/mm/yy",
    },
    {
        text: "dd.mm.yy",
        value: "dd.mm.yy",
    },
]

export function Settings({ navigation, route }: SettingsProps) {
    const { loading, toast } = useApp()
    const { currentUser } = useAuth()
    const { theme, isDark, setIsDark } = useTheme()

    const [dateFormat, setDateFormat] = React.useState(currentUser.dateFormat)
    const [showDateFormatPicker, setShowDateFormatPicker] = React.useState(
        false
    )
    const [showMenu, setShowMenu] = React.useState(false)

    React.useEffect(() => {}, [])

    const handleDarkModePress = async () => {
        loading(true)
        setIsDark(!isDark)

        try {
            await updateUser(currentUser.id, { darkMode: !isDark })
        } catch (err) {
            toast(err.message)
        }

        loading(false)
    }

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (err) {
            toast(err.message)
        }
    }

    const styles = StyleSheet.create({
        header: {
            paddingHorizontal: theme.spacing.primary,
            paddingTop: Constants.statusBarHeight + 4,
            paddingBottom: 4,
            flexDirection: "row",
        },
        headerRightBtn: {
            marginLeft: "auto",
        },
        headerLeftBtn: {
            marginRight: "auto",
        },
        item: {
            flexDirection: "row",
        },
        itemRight: {
            marginLeft: "auto",
            marginRight: theme.spacing.tertiary,
            justifyContent: "center",
        },
        button: {
            marginBottom: theme.spacing.primary,
            width: "100%",
        },
    })

    const handleDateFormat = async (value: string) => {
        loading(true)
        setDateFormat(value)
        try {
            await addDateFormat(currentUser.id, value)
        } catch (err) {
            toast(err.message)
        }
        loading(false)
    }

    return (
        <>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    style={styles.headerLeftBtn}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView style={{ padding: theme.spacing.primary }}>
                <Card onPress={handleDarkModePress} style={styles.item}>
                    <View>
                        <Text h3>Dark Mode</Text>
                        <Text subtitle>Toggle dark theme</Text>
                    </View>
                    <Switch
                        value={isDark}
                        onValueChange={handleDarkModePress}
                        thumbColor={theme.colors.primary}
                        trackColor={{
                            false: theme.colors.accent,
                            true: theme.colors.primaryAccent,
                        }}
                        style={{ marginLeft: "auto" }}
                    />
                </Card>
                <Card
                    onPress={() => setShowDateFormatPicker(true)}
                    style={styles.item}
                >
                    <View>
                        <Text h3>Date Format</Text>
                        <Text subtitle>{dateFormat}</Text>
                    </View>
                    <View style={styles.itemRight}>
                        <Icon
                            icon="chevron-right"
                            size={28}
                            color={theme.icon.color}
                        />
                    </View>
                </Card>
                <Card onPress={handleSignOut} style={styles.item}>
                    <View>
                        <Text h3>Sign out</Text>
                        <Text subtitle>Return to the login screen</Text>
                    </View>
                    <View style={styles.itemRight}>
                        <Icon
                            icon="sign-out-alt"
                            size={28}
                            color={theme.icon.color}
                        />
                    </View>
                </Card>
                <Picker
                    show={showDateFormatPicker}
                    setShow={setShowDateFormatPicker}
                    value={dateFormat}
                    setValue={handleDateFormat}
                    data={options}
                />
            </ScrollView>
        </>
    )
}
