
import * as React from "react"
import { Alert, Modal, StyleSheet, View } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { useTheme } from "contexts/ThemeContext"
import { useToast } from "contexts/ToastContext"
import { useLoading } from "contexts/LoadingContext"
import { MyView } from "library/MyView"
import { ScreenView } from "library/ScreenView"
import { Text } from "library/Text"
import { Input } from "library/Input"
import { Button } from "library/Button"
import { sendResetPasswordEmail, signIn, signUp } from "api/auth"
import { SigninProps } from "navigation/types"
import { addUser } from "api/firestore"

export const Signin = (props: SigninProps) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [currentLayout, setCurrentLayout] = React.useState<"signin" | "signup" | "forgotPassword">("signin")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const { showToast } = useToast()
    const { theme } = useTheme()
    const { loading } = useLoading()

    const toggleShowPassword = () => {
        setShowPassword(!showPassword) 
    }

    const validateEmail = (email: string) => {
        const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!emailFormat.test(email)) {
            showToast("Invalid email format")
            return false
        } 
        return true  
    }

    const validatePassword = (password: string) => {
        if(password.length < 6) {
            showToast("Password too short")
            return false
        }
        return true
    }

    const handleSignIn = async () => {
        if(validateEmail(email) && validatePassword(password)) {
            await signIn(email, password)
        }
    }

    const handleSignUp = async () => {
        if(validateEmail(email) && validatePassword(password)) {
            await signUp(email, password)
            showToast("Account created :)")
        }    
    }

    const handlePasswordReset = async () => {
        await sendResetPasswordEmail(email)
        showToast(`Password reset link sent to\n${email}`)
    }

    const handleSubmit = async () => {
        loading(true)
        try {
            if(currentLayout==="signin") await handleSignIn()
            else if(currentLayout==="signup") await handleSignUp()
            else if(currentLayout==="forgotPassword") await handlePasswordReset()
        } catch (err) {
            showToast(err.message)
        }
        loading(false)
    }

    const styles = StyleSheet.create({
        input: {
            
        },
        title: {
            marginTop: 56,
            marginBottom: 40,
            marginLeft: "auto",
            marginRight: "auto"
        },
        leftIcon: {
            marginLeft: 10,
            marginRight: 16,
        },
        rightIcon: {
 /*            opacity: showSignIn ? 0 : 100, */
            marginRight: 10,
        },
        button: {
            
        },
        bottomText: {
            marginTop: 20,
            padding: theme.spacing.primary,
            alignItems: "center",
            alignSelf: "center",
        },
        forgotPassword: {
            marginTop: "auto",
            marginBottom: 8,
            alignSelf: "center",
            padding: theme.spacing.primary      
        }
    })

    return (
        <ScreenView style={{padding: theme.spacing.primary}}>
            <MyView direction="row" style={styles.title}>
                <View style={{justifyContent: "center", marginRight: theme.spacing.primary}}>
                    <FontAwesomeIcon icon="clock" size={56} color={theme.colors.primary}/>
                </View>
                <View>
                    <Text h1 style={{fontSize: 36}}>Countdown</Text>
                    <Text subtitle>Track your important events</Text> 
            </View>
            </MyView>

            <Input
                placeholder="Email"
                value={email}
                setValue={setEmail}
                style={styles.input}
            />
            {currentLayout !== "forgotPassword" &&
                <Input
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={showPassword ? false : true}
                    rightIcon={showPassword ? "eye" : "eye-slash"}
                    rightIconOnPress={toggleShowPassword}
                />
            }
            <Button 
                title={currentLayout==="signin" ? "Sign In" : currentLayout==="signup" ? "Sign Up" : currentLayout==="forgotPassword" ? "Reset Password" : "" } 
                onPress={handleSubmit} 
                style={styles.button}
            />  
 
            {currentLayout === "signin" && 
                <MyView style={styles.bottomText} onPress={() => setCurrentLayout("signup")} feedbackEnabled={false}>
                    <Text subtitle>Need an account? <Text style={{ fontWeight: "bold" }}>Sign Up.</Text></Text>
                </MyView>
            }
            {currentLayout === "signup" && 
                <MyView style={styles.bottomText} onPress={() => setCurrentLayout("signin")} feedbackEnabled={false}>
                    <Text subtitle>Already have an account? <Text style={{ fontWeight: "bold" }}>Sign In.</Text></Text>
                </MyView>
            }
            {currentLayout === "forgotPassword" && 
                <MyView style={styles.bottomText} onPress={() => setCurrentLayout("signin")} feedbackEnabled={false}>
                    <Text subtitle>Return to Signin.</Text>
                </MyView>
            }
            {currentLayout=="signin" &&
                <MyView style={styles.forgotPassword} onPress={() => setCurrentLayout("forgotPassword")} feedbackEnabled={false}>
                    <Text subtitle2>Forgot password?</Text>
                </MyView>
            }   
        </ScreenView>
    )
}

export default Signin
