import * as React from 'react'
import { StyleSheet, View, Image, Alert, Modal } from 'react-native'
import { EventsProps } from 'navigation/types'
import { useTheme } from 'contexts/ThemeContext'
import { Card } from 'library/Card'
import { ScreenView } from 'library/ScreenView'
import { Text } from "library/Text"
import { EventInfo } from "common/types"
import { deleteEvent } from 'api/firestore'
import { formatDate } from 'common/helpers'
import { useAuth } from 'contexts/AuthContext'
import { useStore } from 'contexts/StoreContext'
import { Button } from 'library/Button'
import { List } from 'library/List'
import { useApp } from 'contexts/AppContext'
import { Timer } from 'components/Timer'

export const EventList = ({ navigation, route }: EventsProps) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [selectedItemId, setSelectedItemId] = React.useState<string>()
    const [selectedItemName, setSelectedItemName] = React.useState<string>()

    const { theme } = useTheme()
    const { toast, loading } = useApp()
    const { currentUser } = useAuth()
    const { events } = useStore() 

    const styles = StyleSheet.create({
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

    const eventItem = ({ item }: { item: EventInfo }) => (
        <Card 
            direction="row" 
            style={{marginBottom: 0}}
            onPress={() => navigation.navigate("EventDetails", { item: item })} 
            onLongPress={() => {
                setSelectedItemId(item.id)
                setSelectedItemName(item.name)
                setModalVisible(true)
            }}
        >
            <View>
                <Text h3>{item.name}</Text>
                <Text subtitle2 >{formatDate(item.date)}</Text> 
            </View>
        </Card>
    )   

    const handleDelete = async () => {
        loading(true)
        
        try {
            await deleteEvent(currentUser.id, selectedItemId)
        } catch(err) {
            toast(err)
        } 
        
        setModalVisible(false)
        loading(false)
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
            <List data={events} renderItem={eventItem} />
        </>
    )
}