import * as React from 'react'
import { ImageBackground, StyleSheet } from "react-native"
import { EventDetailsProps } from 'navigation/types'
import { useLoading } from 'contexts/LoadingContext'
import { useTheme } from 'contexts/ThemeContext'
import { useToast } from 'contexts/ToastContext'
import { ScreenView } from 'library/ScreenView'
import { Text } from "library/Text"
import { Card } from 'library/Card'
import { Timer } from 'components/Timer'
import { IconButton } from 'library/IconButton'

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const { theme } = useTheme()
    const { showToast } = useToast()
    const { loading } = useLoading()

    console.log(route.params)

    const styles = StyleSheet.create({
        text: {
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 20,
        },
        number: {

        },
        letter: {

        },
        name: {
            marginVertical: theme.spacing.primary
        },
        row: {
            flexDirection: "row",
            width: 125,
            justifyContent: "space-around"
        }
    })
/* 
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <IconButton
                    onPress={() => { navigation.navigate("EditEvent", { id: id, event: event }) }}
                    icon="pencil-alt"
                />
        })
    }, [navigation])  */

    return (
        <ScreenView>
            <Text>Event Details</Text>
            <Card style={{ flex: 1, justifyContent: "space-around", padding: theme.spacing.primary, borderRadius: 0 }}>
                {/* <ImageBackground source={require("../../assets/test2.png")} style={{ height: "100%", width: "100%", flex: 1, resizeMode: "cover", justifyContent: "center", alignItems: "center" }}> */}
                     {/* <Timer date={route.params.date} title={route.params.name} /> */}
               {/* </ImageBackground> */}
            </Card>  
        </ScreenView >
    )
}
