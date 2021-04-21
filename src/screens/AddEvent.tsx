import * as React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from "formik"

import { StyleSheet } from "react-native"
import { AddEventProps } from "navigation/types"
import { useToast } from "contexts/ToastContext"
import { ScreenView } from "library/ScreenView"
import { Input } from "library/Input"
import { Card } from "library/Card"
import { Button } from "library/Button"
import { DateTimePicker } from "library/DateTimePicker"
import { addEvent } from "api/firestore"
import { View } from "react-native"
import { useTheme } from "contexts/ThemeContext"
import { Text } from "library/Text"
import { MyView } from "library/MyView"
import { ImagePicker } from "library/ImagePicker"
import { EventInfo } from "common/types"

export const AddEvent = ({ navigation, route }: AddEventProps) => {
    const [name, setName] = React.useState("")
    const [date, setDate] = React.useState<Date | undefined>()

    const { showToast } = useToast()
    const { theme } = useTheme()
    
    const handleSubmit = async () => {
        if(name.length < 1) {
            showToast("Please enter a name.")
            return
        } else if(!date) {
            showToast("Please select a date.")
            return
        }

        try {
            await addEvent({name, date})

            setName("")
            setDate(undefined)
            
            showToast("Event Created")
        } catch(err) {
            showToast(err.message)
        }
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