import * as React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from "formik"

import { AddEventProps } from "navigation/types"
import { useToast } from "contexts/ToastContext"
import { ScreenView } from "library/ScreenView"
import { Input } from "library/Input"
import { Card } from "library/Card"
import { Button } from "library/Button"

export const AddEvent = ({ navigation, route }: AddEventProps) => {
    const { showToast } = useToast()
    
    const handleSubmit = (values: any) => {
        storeData(values)
    }

    const storeData = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('2', jsonValue)
          showToast("Success")
        } catch (e) {
            showToast(e.message)
        }
    }

    return (
        <ScreenView>
            <Formik
                initialValues={{ title: ""}}
                onSubmit={values => handleSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <Card>
                        <Input
                            label="Title"
                            onChangeText={handleChange('title')}
                            onBlur={() => handleBlur('title')}
                            value={values.title}
                        />
                        <Button title="Create Event" onPress={handleSubmit} />
                    </Card>
                )}
            </Formik>
        </ScreenView>
    )
}