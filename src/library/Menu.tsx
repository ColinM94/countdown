import * as React from "react"
import { StyleSheet, View, Modal, Pressable } from "react-native"
import { useApp } from "contexts/AppContext"
import { useTheme } from "contexts/ThemeContext"
import { MyView } from "./MyView"
import { Text } from "./Text"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Divider } from "./Divider"

interface item {
    text: string
    onPress: () => void
    leftIcon: IconProp
    divider?: boolean
}

interface MenuProps {
    isVisible: boolean
    setIsVisible: (visible: boolean) => void
    items: item[]
}

export const Menu = ({isVisible, setIsVisible, items}: MenuProps) => {
    const { theme } = useTheme()
    const { toast } = useApp()
    
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
            marginLeft: "auto"
        },
        item: {
            flexDirection: "row",
            padding: 12
        },
        leftIcon: {
            marginRight: 12
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
        <Pressable style={styles.container} onPress={() => {setIsVisible(false)}}>               
            <View style={styles.menu}>      
                {items.map(item => 
                    <>
                        <MyView onPress={() => handlePress(item.onPress)} style={styles.item}>
                            <FontAwesomeIcon icon={item.leftIcon} color={theme.icon.color} size={theme.icon.size} style={styles.leftIcon} />
                            <Text>{item.text}</Text>
                        </MyView>
                        <View style={{backgroundColor: item.divider ? theme.colors.accent : 'rgba(0,0,0,0)', height: 1}} />
                    </>
                )}
            </View>
        </Pressable>           
    </Modal>
    )
}