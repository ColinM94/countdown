import * as React from "react"
import { Pressable, StyleSheet } from "react-native"
import { Modal as RNModal, ModalProps as RNModalProps } from "react-native"

export interface ModalProps extends RNModalProps{
    show: boolean
    setShow: (show: boolean) => void
    children: React.ReactNode | React.ReactNode[]
}

export const Modal = ({show, setShow, children, ...rest}: ModalProps) => {
    const styles = StyleSheet.create({
        container: {
            height: "100%",
            width: "100%",
        },
    })  

    const close = () => {
        setShow(false)
    }
        
    return ( 
            <RNModal
                animationType="slide"
                transparent={true}
                visible={show}
                onRequestClose={() => { 
                    setShow(!show)
                }}
                {...rest}
            >
                <Pressable style={styles.container} onPress={close}>    
                    {children}           
                </Pressable>
            </RNModal>

       
    )
}