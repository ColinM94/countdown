import * as React from "react"
import { StyleSheet, View, Text } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { Icon } from "library/Icon"

export const SignInHeading = () => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            marginTop: 56,
            marginBottom: 40,
            marginLeft: "auto",
            marginRight: "auto",
            flexDirection: "row",
            color: theme.colors.text.primary,
        },
        title: {
            color: theme.colors.text.primary,
            fontSize: 40,
        },
        subtitle: {
            color: theme.colors.text.secondary,
            fontSize: 18,
        },
    })

    return (
        <View style={styles.container}>
            <View
                style={{
                    justifyContent: "center",
                    marginRight: theme.spacing.primary,
                }}
            >
                <Icon icon="clock" size={56} color={theme.colors.primary} />
            </View>
            <View>
                <Text style={styles.title}>Countdown</Text>
                <Text style={styles.subtitle}>Track your important events</Text>
            </View>
        </View>
    )
}
