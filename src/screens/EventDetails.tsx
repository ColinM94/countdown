import * as React from 'react'
import { ImageBackground, StyleSheet, View } from "react-native"

import { Button, Card, IconButton, ScreenView, Text, Timer } from "components"
import { EventDetailsProps } from "navigation"
import { getEvent, deleteEvent } from 'api'
import { useTheme, useLoading, useToast } from "contexts"
import { Event } from "common/types"
import { BackgroundImage } from 'react-native-elements/dist/config'

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const [id, setId] = React.useState(route.params.id)
    const [name, setName] = React.useState(route.params.event?.name ?? "")
    const [date, setDate] = React.useState(route.params.event?.date ?? new Date())
    const [event, setEvent] = React.useState(route.params.event)

    const { theme } = useTheme()
    const { showToast } = useToast()
    const { loading } = useLoading()

    const loadData = async () => {
        loading(true)
        try {
            const event: Event = await getEvent(id)

            setName(event.name)
            setDate(event.date)
        } catch (error) {
            alert(error.message)
        }
        loading(false)
    }

    const handleDelete = (id: string) => {
        deleteEvent(id).then(() => {
            navigation.navigate("EventList")
            showToast("Event Deleted")
        })
    }

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
            marginVertical: theme.spacing()
        },
        row: {
            flexDirection: "row",
            width: 125,
            justifyContent: "space-around"
        }
    })

    React.useEffect(() => {
        loadData()
    }, [])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <IconButton
                    onPress={() => { navigation.navigate("EditEvent", { id: id, event: event }) }}
                    icon="pencil-alt"
                    iconStyle={{ color: theme.colors.text.main }}
                    containerStyle={{ marginRight: theme.spacing() }}
                />
        })
    }, [navigation])

    return (
        <ScreenView onRefresh={loadData} style={{ padding: 0 }}>
            <Card style={{ flex: 1, justifyContent: "space-around", padding: theme.spacing(0), borderRadius: 0 }}>
                <ImageBackground source={require("../../assets/test2.png")} style={{ height: "100%", width: "100%", flex: 1, resizeMode: "cover", justifyContent: "center", alignItems: "center" }}>
                    <Timer date={date} title={name} />
                </ImageBackground>
            </Card>
        </ScreenView >
    )
}
