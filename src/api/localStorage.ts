import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (err) {
        alert(err.message)
    }
}

export const getData = async (key: string) => {
    try {
        await AsyncStorage.getItem(key)
    } catch (err) {
        return await AsyncStorage.getItem(key)
    }
}