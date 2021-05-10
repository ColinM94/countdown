import * as React from "react"
import * as ExpoImagePicker from "expo-image-picker"
import { Platform } from "react-native"
import { IconButton, IconButtonProps } from "../IconButton"

interface ImagePickerProps {
    setImage: (image: any) => void
    show: boolean
    setShow: (show: boolean) => void
}

export const ImagePicker = (props: ImagePickerProps) => {
    const { setImage, show, setShow } = props

    React.useEffect(() => {
        ;(async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync()
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    )
                }
            }
        })()
    }, [])

    React.useEffect(() => {
        if (show) {
            pickImage()
        }
        setShow(false)
    }, [show])

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

    return <></>
}
