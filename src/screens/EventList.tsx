import * as React from 'react'
import { StyleSheet, View, Image, Alert, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EventsProps } from 'navigation/types'
import { useTheme } from 'contexts/ThemeContext'
import { useToast } from 'contexts/ToastContext'
import { useLoading } from 'contexts/LoadingContext'
import { Card } from 'library/Card'
import { ScreenView } from 'library/ScreenView'
import { Text } from "library/Text"
import { EventInfo } from "common/types"
import { deleteEvent, getEvents } from 'api/firestore'
import { formatDate } from 'common/helpers'
import { Button } from 'library/Button'
import { MyView } from 'library/MyView'

export const EventList = ({ navigation, route }: EventsProps) => {
    const [events, setEvents] = React.useState<EventInfo[]>()
    const [modalVisible, setModalVisible] = React.useState(false)
    const { theme } = useTheme()
    const { showToast } = useToast()
    const { loading } = useLoading()
    const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>()
    const [selectedItemName, setSelectedItemName] = React.useState<string | undefined>()

    const styles = StyleSheet.create({
        itemName: {
            ...theme.typography.h3 as {},
        },
        itemDate: {
            ...theme.typography.subtitle as {}
        },
        modal: {
            marginLeft: "auto", 
            marginRight: "auto", 
            marginTop: "40%", 
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: theme.colors.card, 
            borderRadius: theme.roundness,
            borderColor: theme.colors.accent,
            borderWidth: 1,
            padding: 24
        }
    })

    const showAlert = (item: EventInfo) =>
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
            {
                text: "Cancel",
                onPress: () => Alert.alert("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => showToast("Deleted"),
                
            }
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert("This alert was dismissed by tapping outside of the alert dialog."),
            }
    );

    const eventItem = ({ item }: { item: EventInfo }) => (
        <Card 
            direction="row" 
            style={{marginBottom: 0}}
            onPress={() => navigation.navigate("EventDetails", { id: item.id, EventInfo: item })} 
            onLongPress={() => {
                setSelectedItemId(item.id)
                setSelectedItemName(item.name)
                setModalVisible(true)
            }}
        >
            <View>
                <Text h3>{item.name}</Text>
                <Text subtitle2>{formatDate(item.date)}</Text>
            </View>
        </Card>
    )   

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            let data = await getEvents()
            setEvents(data)
        } catch (err) {
            showToast(err.message)
        }
    }

    const handleDelete = async () => {
        await deleteEvent(selectedItemId)
        loadData()
        setModalVisible(false)
    }

    return (
        <>
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.modal}>
                    <Text h3 style={{marginBottom: 16}}>{selectedItemName}</Text>
                    <View style={{flexDirection: "row", marginTop: "auto"}}>
                        <Button 
                            title="Delete" 
                            onPress={handleDelete}
                            style={{marginRight: 12, backgroundColor: "red"}} 
                        />
                        <Button 
                            title="Cancel" 
                            onPress={() => setModalVisible(false)} 
                        />
                    </View>
                </View>
        </Modal>
        <ScreenView data={events} renderItem={eventItem} onRefresh={loadData}>

        </ScreenView>
        </>


/*         <ScreenView>
            <Card>
                <Text overline>Overline</Text>
                <Text h1>Heading 1</Text>
                <Text body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
            </Card>
        </ScreenView> */
       

    )
}