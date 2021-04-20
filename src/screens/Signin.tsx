
import * as React from "react"
import { StyleSheet, View } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { useTheme } from "contexts/ThemeContext"
import { useToast } from "contexts/ToastContext"
import { ScreenView } from "library/ScreenView"
import { Text } from "library/Text"
import { Input } from "library/Input"
import { Button } from "library/Button"
import { sendResetPasswordEmail, signIn, signUp } from "api/auth"
import { SigninProps } from "navigation/types"
import { useLoading } from "contexts/LoadingContext"
import { Card } from "library/Card"
import { MyView } from "library/MyView"
import { Formik } from "formik"

export const Signin = (props: SigninProps) => {
    const [showSignIn, setShowSignIn] = React.useState(true)
    const [showForgotPassword, setShowForgotPassword] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [currentLayout, setCurrentLayout] = React.useState<"signin" | "signup" | "forgotPassword">("signin")

    // Contexts.
    const { showToast } = useToast()
    const { theme } = useTheme()
    const { loading } = useLoading()

    // Errors.
    const [emailError, setEmailError] = React.useState(false)
    const [nameError, setNameError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [password2Error, setPassword2Error] = React.useState(false)

    // Icons.
    const iconSize = 24
    const crossIcon = <FontAwesomeIcon icon="times" size={iconSize} color={"red"} />
    const tickIcon = <FontAwesomeIcon icon="check" size={iconSize} color={"green"} />
    const envelopeIcon = <FontAwesomeIcon icon="envelope" size={iconSize} color={theme.icon.color} />
    const userIcon = <FontAwesomeIcon icon="user" size={iconSize} color={theme.icon.color} />
    const lockIcon = <FontAwesomeIcon icon="lock" size={iconSize} color={theme.icon.color} />

    // Regex.
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const handleShowPassword = () => {
        setShowPassword(!showPassword) 
    }

    const validateEmail = (email: string) => {
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

    const validateName = (name: string) => {
        if (name.length < 1) {
            showToast("Name too short")
            return false
        } 
        return true
    }

    const handleSubmit = async ({email, password, name}) => {
        loading(true)
        try {
            if(currentLayout === "forgotPassword") {
                await sendResetPasswordEmail(email)
                setCurrentLayout("signin")
                showToast(`Password reset link sent to\n${email}`)
            } else if (currentLayout === "signin") {
                if(validateEmail(email) && validatePassword(password)) await signIn(email, password)
            } else if(currentLayout === "signup") {
                if(validateEmail(email) && validatePassword(password) && validateName(name)) {
                    await signUp(email, password)
                    showToast("Account created :)")
                }          
            }
        } catch(err) {
            showToast(err.message)
        }
        loading(false)
    }

    // Reruns validation if user switches to Signup screen. 
    React.useEffect(() => {
        if (!showSignIn) {

        }
    }, [showSignIn])

    const styles = StyleSheet.create({
        input: {
            
        },
        title: {
            marginTop: 28,
            marginBottom: 36,
            marginLeft: "auto",
            marginRight: "auto"
        },
        leftIcon: {
            marginLeft: 10,
            marginRight: 16,
        },
        rightIcon: {
            opacity: showSignIn ? 0 : 100,
            marginRight: 10,
        },
        button: {
            marginTop: theme.spacing.primary
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

            <Formik
                initialValues={{ email: "", password: "", name: ""}}
                onSubmit={ values => handleSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        {currentLayout === "signup" &&
                            <Input
                                placeholder="Name"
                                onChangeText={handleChange('name')}
                                value={values.name}
                                style={styles.input}
                            />
                        }
                        <Input
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            value={values.email}
                            style={styles.input}
                        />
                        {currentLayout !== "forgotPassword" &&
                            <Input
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                value={values.password}
                                secureTextEntry={showPassword ? false : true}
                                rightIcon={showPassword ? "eye" : "eye-slash"}
                                rightIconOnPress={handleShowPassword}
                            />
                        }
                       
                        <Button 
                            title={currentLayout==="signin" ? "Sign In" : currentLayout==="signup" ? "Sign Up" : currentLayout==="forgotPassword" ? "Reset Password" : "" } 
                            onPress={handleSubmit} 
                            style={styles.button}
                        />
                    </>
                )}
            </Formik>    

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
                    <Text subtitle2>Return to Signin.</Text>
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
