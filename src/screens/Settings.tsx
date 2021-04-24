import * as React from "react"
import { StyleSheet, View } from "react-native"
import { Switch } from 'react-native-paper'
import { SettingsProps } from "navigation/types"
import { useTheme } from "contexts/ThemeContext"
import { ScreenView } from "library/ScreenView"
import { Text } from "library/Text"
import { Card } from "library/Card"
import { signOut } from "api/auth"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Picker } from "library/Picker"
import { addDateFormat, updateUser } from "api/firestore"
import { useAuth } from "contexts/AuthContext"
import { useApp } from "contexts/AppContext"

const options = [
    {
        text: "dd/mm/yy",
        value: "dd/mm/yy",
    },
    {
        text: "dd.mm.yy",
        value: "dd.mm.yy",
    }
]

export function Settings({ navigation, route }: SettingsProps) {
    const { loading, toast } = useApp()
    const { currentUser } = useAuth()
    const { theme, isDark, setIsDark } = useTheme()

    const [dateFormat, setDateFormat] = React.useState(currentUser.dateFormat)
    const [showDateFormatPicker, setShowDateFormatPicker] = React.useState(false)
    
    React.useEffect(() => {
     
    }, [])
    
    const handleDarkModePress = async () => {
        loading(true)
        setIsDark(!isDark)

        try {
            await updateUser(currentUser.id, {darkMode: !isDark})
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
        item: {
            paddingHorizontal: theme.spacing.primary,
            marginBottom: theme.spacing.primary
        },
        button: {
            marginBottom: theme.spacing.primary,
            width: "100%"
        }
    })

    const handleDateFormat = async (value: string) => {
        loading(true)
        setDateFormat(value)
        try {
            await addDateFormat(currentUser.id, value)
        } catch(err) {
            toast(err.message)
        }
        loading(false)
    }

    return (
        <ScreenView>
            <Card direction="row" onPress={handleDarkModePress}>
                <View>
                    <Text h3>Dark Mode</Text>
                    <Text subtitle>Toggle dark theme</Text>
                </View>
                <Switch value={isDark} onValueChange={handleDarkModePress} color={theme.colors.primary} style={{ marginLeft: "auto" }} />
            </Card>
            <Card direction="row" onPress={() => setShowDateFormatPicker(true)}>
                <View>
                    <Text h3>Date Format</Text>
                    <Text subtitle>{dateFormat}</Text>
                </View>
                <View style={{marginLeft: "auto", marginRight: theme.spacing.tertiary, justifyContent: "center"}}>
                    <FontAwesomeIcon icon="chevron-right" size={28} color={theme.icon.color}/>
                </View>
            </Card>
            <Card direction="row" onPress={handleSignOut}>
                <View>
                    <Text h3>Sign out</Text>
                    <Text subtitle>Return to the login screen</Text>
                </View>
                <View style={{marginLeft: "auto", marginRight: theme.spacing.tertiary, justifyContent: "center"}}>
                    <FontAwesomeIcon icon="sign-out-alt" size={28} color={theme.icon.color}/>
                </View>
            </Card>
            <Picker show={showDateFormatPicker} setShow={setShowDateFormatPicker} value={dateFormat} setValue={handleDateFormat} data={options}/>
        </ScreenView>
    )
}