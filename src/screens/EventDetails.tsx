import * as React from 'react'
import { StyleSheet } from "react-native"
import { EventDetailsProps } from 'navigation/types'
import { useLoading } from 'contexts/LoadingContext'
import { useTheme } from 'contexts/ThemeContext'
import { useToast } from 'contexts/ToastContext'
import { ScreenView } from 'library/ScreenView'
import { Text } from "library/Text"

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const { theme } = useTheme()
    const { showToast } = useToast()
    const { loading } = useLoading()

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

    /* React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <IconButton
                    onPress={() => { navigation.navigate("EditEvent", { id: id, event: event }) }}
                    icon="pencil-alt"
                    iconStyle={{ color: theme.colors.text.main }}
                    containerStyle={{ marginRight: theme.spacing.primary }}
                />
        })
    }, [navigation]) */

    return (
        <ScreenView>
            <Text>Event Details</Text>
{/*             <Card style={{ flex: 1, justifyContent: "space-around", padding: theme.spacing(0), borderRadius: 0 }}>
                <ImageBackground source={require("../../assets/test2.png")} style={{ height: "100%", width: "100%", flex: 1, resizeMode: "cover", justifyContent: "center", alignItems: "center" }}>
                    <Timer date={date} title={name} />
                </ImageBackground>
            </Card> */}
        </ScreenView >
    )
}
