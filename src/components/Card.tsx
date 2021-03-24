import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ThemeContext } from "contexts/ThemeContext"
import Divider from "components/Divider"

type CardProps = {
    children?: JSX.Element | JSX.Element[],
    title?: string,
}

const Card = ({ children, title }: CardProps) => {
    const { theme } = React.useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.cardBackground,
            padding: theme.spacing,
            margin: theme.spacing / 2,
            alignItems: "center",
            flexShrink: 1
        },
        title: {
            fontSize: 20,
            fontWeight: "bold"
        },
        text: {
            color: theme.colors.cardText
        }
    })

    return (
        <View style={styles.container}>
            {title &&
                <>
                    <Text style={[styles.text, styles.title]}>{title}</Text>
                    <Divider />
                </>
            }
            <Text style={[styles.text, { marginBottom: theme.spacing }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc ornare diam a metus fringilla dictum. Donec in tempor diam, sit amet interdum leo.
            In nec lacinia nisl. Praesent dapibus tellus ac eros rutrum vestibulum.
            </Text>
            {children}
        </View>
    )
}

export default Card



