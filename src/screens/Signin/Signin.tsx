import * as React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Icon } from "library/Icon"

import { useTheme } from "contexts/ThemeContext"
import { Pressable } from "library/Pressable"
import { ScreenContainer } from "library/ScreenContainer"
import { Input } from "library/Input"
import { Button } from "library/Button"
import { SigninProps } from "navigation/types"
import { useApp } from "contexts/AppContext"
import { sendResetPasswordEmail, signIn, signUp } from "api/auth"
import { SignInHeading } from "./SignInHeading"
import { SignInForm } from "./SignInForm"

export const Signin = (props: SigninProps) => {
    const { theme } = useTheme()
    const styles = StyleSheet.create({
        container: {
            padding: theme.spacing.primary,
        },
    })

    return (
        <ScreenContainer style={styles.container}>
            <SignInHeading />
            <SignInForm />
        </ScreenContainer>
    )
}

export default Signin
