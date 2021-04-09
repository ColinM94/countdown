import * as React from "react"
import { Platform, View, Image } from "react-native"
import * as ExpoImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'
import { Button, Input } from "components"

type ImagePickerProps = {
    image: any,
    setImage: any
}

export const ImagePicker = ({ image, setImage }: ImagePickerProps) => {

    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        })

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    return (
        <View style={{ width: "100%", alignItems: "center" }}>
            <Input label="Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 112, height: 200 }} />}
        </View>
    )
}