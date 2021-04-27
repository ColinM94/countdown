import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { Text } from "library/Text"
import dayjs from "dayjs"
import { formatDate, formatTime } from "common/helpers"
import { Divider } from "library/Divider"
import { Slider } from "react-native-elements"
import { useTheme } from "contexts/ThemeContext"
import { useApp } from "contexts/AppContext"

interface TimerProps {
    /** Date  */
    date: Date
    style?: StyleProp<ViewStyle>,
    title?: string
}

export const Timer = ({ date, style, title }: TimerProps) => {
    const [years, setYears] = React.useState(0)
    const [showYears, setShowYears] = React.useState(true)

    const [months, setMonths] = React.useState(0)
    const [showMonths, setShowMonths] = React.useState(true)

    const [days, setDays] = React.useState(0)
    const [showDays, setShowDays] = React.useState(true)

    const [hours, setHours] = React.useState(0)
    const [showHours, setShowHours] = React.useState(true)

    const [minutes, setMinutes] = React.useState(0)
    const [showMinutes, setShowMinutes] = React.useState(true)

    const [seconds, setSeconds] = React.useState(0)

    const [sliderValue, setSliderValue] = React.useState(1)

    const { theme } = useTheme()
    const { loading } = useApp()

    const utc = require('dayjs/plugin/utc')
    dayjs.extend(utc)

    React.useEffect(() => {
        loading(true)
        calculate()
        loading(false)

        const timer = setInterval(() => {
            calculate()
        }, 1000)

        return () => clearInterval(timer)
    }, [sliderValue])

    const calculate = () => {
        setSliderValue(prev => {
            let date1 = dayjs(date).utc(true)
            let date2 = dayjs().utc(true)

            if (prev === 1) {
                setShowYears(true)
                const yearDiff = Math.floor(Math.trunc(date1.diff(date2, 'year', true)))
                date1 = date1.subtract(yearDiff, 'year')
                setYears(Math.abs(yearDiff))
            } else {
                setShowYears(false)
            }
            
            if (prev <= 2) {
                setShowMonths(true)
                const monthDiff = Math.floor(Math.trunc(date1.diff(date2, 'month', true)))
                date1 = date1.subtract(monthDiff, 'month')
                setMonths(Math.abs(monthDiff))
            } else {
                setShowMonths(false)
            } 

            if (prev <= 3) {
                setShowDays(true)
                const dayDiff = Math.floor(Math.trunc(date1.diff(date2, 'day', true)))
                date1 = date1.subtract(dayDiff, 'day')
                setDays(Math.abs(dayDiff))
            } else {
                setShowDays(false)
            }

            if (prev <= 4) {
                setShowHours(true)
                const hourDiff = Math.floor(Math.trunc(date1.diff(date2, 'hour', true)))
                date1 = date1.subtract(hourDiff, 'hour')
                setHours(Math.abs(hourDiff))
            } else {
                setShowHours(false)
            }

            if (prev <= 5) {
                setShowMinutes(true)
                const minuteDiff = Math.floor(Math.trunc(date1.diff(date2, 'minute', true)))
                date1 = date1.subtract(minuteDiff, 'minute')
                setMinutes(Math.abs(minuteDiff))
            } else {
                setShowMinutes(false)
            }

            const secondDiff = Math.floor(Math.trunc(date1.diff(date2, 'second', true)))
            date1 = date1.subtract(secondDiff, 'second')
            setSeconds(Math.abs(secondDiff))

            return prev
        })
    }

    const styles = StyleSheet.create({
        container: {
            alignItems: "center"
        },
        text: {
            textShadowColor: 'rgba(0, 0, 0, 1)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 10,
        },
        number: {
            marginLeft: theme.spacing.primary
        },
        letter: {
            marginRight: theme.spacing.primary
        },
        title: {
            marginVertical: theme.spacing.primary
        },
        date: {
            marginBottom: theme.spacing.primary
        },
        row: {
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-evenly"
        },
        slider: {
            width: "100%",
        },
        sliderThumb: {
            backgroundColor: theme.colors.primary,
            borderWidth: 1,
            borderColor: theme.colors.card,
            height: 30,
            width: 30
        },
        sliderTrack: {
            height: 2
        }
    })

    return (
        <View style={[styles.container, style]}>
            <Text h1 style={[styles.text, styles.title]}>{title}</Text>
            <Text body style={[styles.text, styles.date]}>{formatDate(date)} - {formatTime(date)}</Text>
            <View style={styles.row}>
                {showYears &&
                    <Text style={styles.text}>
                        <Text h1 style={styles.number}>{years.toString()}</Text>
                        <Text subtitle style={styles.letter}>Y</Text>
                    </Text>
                }
                {showMonths &&
                    <Text style={styles.text}>
                        <Text h1 style={styles.number}>{months.toString()}</Text>
                        <Text subtitle style={styles.letter}>M</Text>
                    </Text>
                }
                {showDays &&
                    <Text style={styles.text}>
                        <Text h1 style={styles.number}>{days.toString()}</Text>
                        <Text subtitle style={styles.letter}>D</Text>
                    </Text>
                }
                {showHours &&
                    <Text style={styles.text}>
                        <Text h1 style={styles.number}>{hours.toString()}</Text>
                        <Text subtitle style={styles.letter}>H</Text>
                    </Text>
                }
                {showMinutes &&
                    <Text style={styles.text}>
                        <Text h1 style={styles.number}>{minutes.toString()}</Text>
                        <Text subtitle style={styles.letter}>M</Text>
                    </Text>
                }
                <Text style={styles.text}>
                    <Text h1 style={styles.number}>{seconds.toString()}</Text>
                    <Text subtitle style={styles.letter}>S</Text>
                </Text>
            </View>
            <View style={styles.row}>
                <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    minimumValue={1}
                    maximumValue={6}
                    step={1}
                    style={styles.slider}
                    thumbStyle={styles.sliderThumb}
                    trackStyle={styles.sliderTrack}
                    allowTouchTrack={true}
                />
            </View>

        </View>
    )
}