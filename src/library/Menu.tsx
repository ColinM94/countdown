import * as React from "react"
import { StyleSheet, View, Modal } from "react-native"
import { useApp } from "contexts/AppContext"
import { useTheme } from "contexts/ThemeContext"
import { Pressable } from "./Pressable"
import { Text } from "./Text"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { Icon } from "./Icon"

export interface Item {
    text: string
    onPress: () => void
    leftIcon: IconProp
    divider?: boolean
}

interface MenuProps {
    isVisible: boolean
    setIsVisible: (visible: boolean) => void
    items: Item[]
}

export const Menu = ({isVisible, setIsVisible, items}: MenuProps) => {
    const { theme } = useTheme()
    
    const handlePress = (onPress: () => void) => {
        onPress()
        setIsVisible(false)
    }

    const styles = StyleSheet.create({
        container: {
            width: "100%", 
            height: "100%",
            padding: 4,
        },
        menu: {     
            backgroundColor: theme.colors.card, 
            marginLeft: "auto",
            borderRadius: theme.roundness,
        },
        item: {
            flexDirection: "row",
            padding: 16,
        },
        leftIcon: {
            marginRight: 16
        }
    })

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
            setIsVisible(!isVisible)
        }}
    >
        <Pressable style={styles.container} onPress={() => {setIsVisible(false)}} feedback={false}>               
            <View style={styles.menu}>      
                {items.map(item => 
                    <>
                        <Pressable onPress={() => handlePress(item.onPress)} style={styles.item}>
                            <Icon icon={item.leftIcon} color={theme.icon.color} size={theme.icon.size} style={styles.leftIcon} />
                            <Text>{item.text}</Text>
                        </Pressable>
                        <View style={{backgroundColor: item.divider ? theme.colors.accent : 'rgba(0,0,0,0)', height: 1, marginHorizontal: 4 }} />
                    </>
                )}
            </View>
        </Pressable>           
    </Modal>
    )
}