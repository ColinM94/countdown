import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value)
}

export const getData = async (key: string) => {
    return await AsyncStorage.getItem(key)
}