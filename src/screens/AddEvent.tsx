import * as React from "react"
import { StyleSheet } from "react-native"
import { AddEventProps } from "navigation/types"
import { ScreenView } from "library/ScreenView"
import { Input } from "library/Input"
import { Button } from "library/Button"
import { DateTimePicker } from "library/DateTimePicker"
import { addEvent } from "api/firestore"
import { View } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { useAuth } from "contexts/AuthContext"
import { useApp } from "contexts/AppContext"

export const AddEvent = ({navigation, route}: AddEventProps) => {
    const [name, setName] = React.useState("")
    const [date, setDate] = React.useState<Date | undefined>()

    const { theme } = useTheme()
    const { currentUser } = useAuth()
    const { loading, toast } = useApp()

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
            await addEvent(currentUser.id, {name, date})
/*             setName("")
            setDate(undefined) */
            navigation.goBack()
            toast("Event Created")
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
        <ScreenView>
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
            <Button title="Create Event" onPress={handleSubmit} />
        </ScreenView>
    )
}