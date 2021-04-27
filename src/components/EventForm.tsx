import * as React from "react"
import { StyleSheet } from "react-native"
import { Input } from "library/Input"
import { Button } from "library/Button"
import { DateTimePicker } from "library/DateTimePicker"
import { addEvent, updateEvent } from "api/firestore"
import { View } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { useAuth } from "contexts/AuthContext"
import { useApp } from "contexts/AppContext"
import { EventInfo } from "common/types"
import { useNavigation } from "@react-navigation/native"

interface EventFormProps {
    event?: EventInfo
}

export const EventForm = ({event}: EventFormProps) => {
    const [id, setId] = React.useState(event?.id)
    const [name, setName] = React.useState(event?.name ?? "")
    const [date, setDate] = React.useState<Date | undefined>(event?.date ?? undefined)

    const { theme } = useTheme()
    const { currentUser } = useAuth()
    const { loading, toast } = useApp()
    const navigation = useNavigation()

    const handleSubmit = async () => {
        loading(true)
        if(name.length < 1) {
            toast("Please enter a name.") 
            return 
        } else if(!date) {
            toast("Please select a date.")
            return 
        }

        try {
            if(event) {
                await updateEvent(currentUser.id, {id, name, date})
                toast("Event Updated") 
                navigation.navigate("EventDetails", {event: {id: id, name: name, date}})
            } else {
                await addEvent(currentUser.id, {name, date})
                navigation.goBack()
                toast("Event Created") 
            }
        } catch(err) {
            toast(err.message)
        }
        loading(false)
    }

    const styles = StyleSheet.create({
        datePicker: {
            flex: 1,
            marginRight: theme.spacing.primary / 2
        },
        timePicker: {
            flex: 1,
            marginLeft: theme.spacing.primary / 2
        }
    })

    return (
        <>
            <Input 
                value={name} 
                setValue={setName} 
                placeholder="Name" 
                containerStyle={{marginBottom: theme.spacing.primary}} 
            />
            <View style={{flexDirection: "row"}}>
                <DateTimePicker 
                    value={date} 
                    setValue={setDate} 
                    mode="date" 
                    placeholder="Select Date" 
                    containerStyle={styles.datePicker}
                />
                <DateTimePicker 
                    value={date} 
                    setValue={setDate} 
                    mode="time" 
                    placeholder="Select Time" 
                    containerStyle={styles.timePicker}    
                />
            </View>
            <Button title={event ? "Update Event" : "Create Event"} onPress={handleSubmit} />
        </>
    )
}