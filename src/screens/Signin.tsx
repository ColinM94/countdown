
import * as React from "react"
import { StyleSheet, View } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { useTheme } from "contexts/ThemeContext"
import { useToast } from "contexts/ToastContext"
import { ScreenView } from "library/ScreenView"
import { Text } from "library/Text"
import { Input } from "library/Input"
import { Button } from "library/Button"
import { signIn, signUp } from "api/auth"
import { SigninProps } from "navigation/types"
import { useLoading } from "contexts/LoadingContext"
import { Card } from "library/Card"
import { MyView } from "library/MyView"
import { Formik } from "formik"

export const Signin = (props: SigninProps) => {
    const [showSignIn, setIsSignIn] = React.useState(true)
    const [showForgotPassword, setShowForgotPassword] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

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

    // Handlers
    const validateEmail = (email: string) => {
        if (emailFormat.test(email)) {
            setEmailError(false)
        } else {
            setEmailError(true)
        }
    }

    const validateName = (name: string) => {
        if (name.length < 1) {
            setNameError(true)
        } else {
            setNameError(false)
        }
    }

    const validatePassword = (password: string) => {
        password.length < 6 ? setPasswordError(true) : setPasswordError(false)
    }

    const handleForgotPassword = () => {

    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword) 
    }

    const handleSubmit = async ({email, password}) => {
        validateEmail(email)
        validatePassword(password)

        if(!emailError && !passwordError) {
            loading(true)
            try {
                showSignIn ? signIn(email, password) : signUp(email, password)
                await signIn(email, password)
            } catch (err) {
                showToast(err.message)
            }
            loading(false)
        }    
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
            alignItems: "center"
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
                initialValues={{ email: "", password: "", password2: "", name: ""}}
                onSubmit={ values => handleSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <Input
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            value={values.email}
                            style={styles.input}
                            error={emailError}
                        />
                        <Input
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            value={values.password}
                            secureTextEntry={showPassword ? false : true}
                            rightIcon={showPassword ? "eye" : "eye-slash"}
                            rightIconOnPress={handleShowPassword}
                            error={passwordError}
                        />
                        <Button title={showSignIn ? "Sign In" : "Sign Up"} onPress={handleSubmit} style={styles.button}/>
                        <MyView
                            style={styles.bottomText}
                            onPress={() => setIsSignIn(!showSignIn)}
                            feedbackEnabled={false}
                        >
                            {showSignIn
                                ?
                                <Text subtitle>Need an account? <Text style={{ fontWeight: "bold" }}>Sign Up.</Text></Text>
                                :
                                <Text subtitle>Already have an account? <Text style={{ fontWeight: "bold" }}>Sign In.</Text></Text>
                            }
                        </MyView>   
                    </>
                )}
            </Formik>    
        </ScreenView>
    )
}

export default Signin
