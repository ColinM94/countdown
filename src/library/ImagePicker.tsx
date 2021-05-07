import * as React from "react"
import * as ExpoImagePicker from 'expo-image-picker'
import { Button, Platform, View } from "react-native"
import { IconButton, IconButtonProps } from "./IconButton"

interface ImagePickerProps extends IconButtonProps {
    setImage: any,
}

export const ImagePicker = ({setImage}: ImagePickerProps) => {
    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync()
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!')
                }
            }
        })()
    }, [])

    const pickImage = async () => {
        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [10, 16],
            quality: 1,
        })

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    return (
        <IconButton icon="image" onPress={pickImage}/>
    )
}