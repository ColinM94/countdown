import * as React from 'react'
import { StyleSheet } from "react-native"

import { Button, Card, IconButton, ScreenView, Text, Timer } from "components"
import { EventDetailsProps } from "navigation"
import { getEvent, deleteEvent } from 'api'
import { useTheme, useLoading, useToast } from "contexts"
import { Event } from "common/types"

export const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const [id, setId] = React.useState(route.params.id)
    const [name, setName] = React.useState(route.params.event?.name ?? "")
    const [date, setDate] = React.useState(route.params.event?.date ?? new Date())

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
        name: {
            marginBottom: theme.spacing(),
            ...theme.typography.h1 as {}
        }
    })

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <IconButton
                    onPress={() => { navigation.navigate("EditEvent", { id: id }) }}
                    icon="pencil-alt"
                    iconStyle={{ color: theme.colors.text.main }}
                    containerStyle={{ marginRight: theme.spacing() }}
                />
        })
    }, [navigation])

    return (
        <ScreenView onRefresh={loadData}>
            <Card style={{ flex: 1, justifyContent: "space-around" }}>
                <Text style={styles.name}>{name}</Text>
                <Timer date={date} style={{ /* marginBottom: theme.spacing() */ }} />
                <Button
                    title="Delete"
                    onPress={() => handleDelete(id)}
                    style={{ marginTop: theme.spacing(4), alignSelf: "center" }}
                />
            </Card>
        </ScreenView>
    )
}
