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

export const Signin = (props: SigninProps) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [currentLayout, setCurrentLayout] = React.useState<
        "signin" | "signup" | "forgotPassword"
    >("signin")
    const [email, setEmail] = React.useState("colinmaher94@gmail.com")
    const [password, setPassword] = React.useState("mara123")

    const { toast, loading } = useApp()
    const { theme } = useTheme()

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const validateEmail = (email: string) => {
        const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!emailFormat.test(email)) {
            toast("Invalid email format")
            return false
        }
        return true
    }

    const validatePassword = (password: string) => {
        if (password.length < 6) {
            toast("Password too short")
            return false
        }
        return true
    }

    const handleSignIn = async () => {
        if (validateEmail(email) && validatePassword(password)) {
            await signIn(email, password)
        }
    }

    const handleSignUp = async () => {
        if (validateEmail(email) && validatePassword(password)) {
            await signUp(email, password)
            toast("Account created :)")
        }
    }

    const handlePasswordReset = async () => {
        try {
            await sendResetPasswordEmail(email)
        } catch (err) {
            toast(err.message)
        }
        toast(`Password reset link sent to\n${email}`)
    }

    const handleSubmit = async () => {
        loading(true)
        try {
            if (currentLayout === "signin") await handleSignIn()
            else if (currentLayout === "signup") await handleSignUp()
            else if (currentLayout === "forgotPassword")
                await handlePasswordReset()
        } catch (err) {
            toast(err.message)
        }
        loading(false)
    }

    const styles = StyleSheet.create({
        titleContainer: {
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
        leftIcon: {
            marginLeft: 10,
            marginRight: 16,
        },
        rightIcon: {
            marginRight: 10,
        },
        button: {},
        bottomText: {
            marginTop: 20,
            padding: theme.spacing.primary,
            alignItems: "center",
            alignSelf: "center",
            borderRadius: theme.roundness,
        },
        forgotPassword: {
            marginTop: "auto",
            marginBottom: 8,
            alignSelf: "center",
            padding: theme.spacing.primary,
            borderRadius: theme.roundness,
        },
    })

    return (
        <ScreenContainer>
            <View style={styles.titleContainer}>
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
                    <Text style={styles.subtitle}>
                        Track your important events
                    </Text>
                </View>
            </View>

            <Input placeholder="Email" value={email} setValue={setEmail} />
            {currentLayout !== "forgotPassword" && (
                <Input
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={showPassword ? false : true}
                    rightIcon={showPassword ? "eye" : "eye-slash"}
                    rightIconOnPress={toggleShowPassword}
                />
            )}
            <Button
                title={
                    currentLayout === "signin"
                        ? "Sign In"
                        : currentLayout === "signup"
                        ? "Sign Up"
                        : currentLayout === "forgotPassword"
                        ? "Reset Password"
                        : ""
                }
                onPress={handleSubmit}
                style={styles.button}
            />

            {currentLayout === "signin" && (
                <Pressable
                    style={styles.bottomText}
                    onPress={() => setCurrentLayout("signup")}
                    feedback={true}
                >
                    <Text>
                        Need an account?{" "}
                        <Text style={{ fontWeight: "bold" }}>Sign Up.</Text>
                    </Text>
                </Pressable>
            )}
            {currentLayout === "signup" && (
                <Pressable
                    style={styles.bottomText}
                    onPress={() => setCurrentLayout("signin")}
                    feedback={true}
                >
                    <Text>
                        Already have an account?{" "}
                        <Text style={{ fontWeight: "bold" }}>Sign In.</Text>
                    </Text>
                </Pressable>
            )}
            {currentLayout === "forgotPassword" && (
                <Pressable
                    style={styles.bottomText}
                    onPress={() => setCurrentLayout("signin")}
                    feedback={true}
                >
                    <Text>Return to Signin.</Text>
                </Pressable>
            )}
            {currentLayout == "signin" && (
                <Pressable
                    style={styles.forgotPassword}
                    onPress={() => setCurrentLayout("forgotPassword")}
                    feedback={true}
                >
                    <Text>Forgot password?</Text>
                </Pressable>
            )}
        </ScreenContainer>
    )
}

export default Signin
