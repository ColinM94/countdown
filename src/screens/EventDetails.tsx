import * as React from 'react'
import { StyleSheet } from "react-native"

import { Button, Card, ScreenView, Text, Timer } from "components"
import { EventProps } from "navigation"
import { getEvent, deleteEvent } from 'api'
import { useTheme, useLoading, useToast } from "contexts"
import { formatDate, formatTime, timeSince } from 'common/helpers'
import { Event } from "common/types"

export const EventDetails = ({ navigation, route }: EventProps) => {
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
        button: {

        }
    })

    return (
        <ScreenView onRefresh={loadData}>
            <Card style={{ height: "100%" }}>
                <Text style={{ marginBottom: theme.spacing * 2 }}>{name}</Text>
                <Timer date={date} style={{ marginBottom: theme.spacing }} />
                <Button
                    title="Delete"
                    onPress={() => handleDelete(id)}
                    style={{ marginTop: theme.spacing, alignSelf: "center" }}
                />
            </Card>
        </ScreenView>
    )
}
