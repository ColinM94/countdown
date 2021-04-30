import * as React from "react"
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "library/Text"
import dayjs from "dayjs"
import { addCommas, formatDate, formatNumberWithCommas, formatTime } from "common/helpers"
import { Divider } from "library/Divider"
import { Slider } from "react-native-elements"
import { useTheme } from "contexts/ThemeContext"
import { useApp } from "contexts/AppContext"

interface TimerProps {
    /** Date  */
    date: Date
    style?: StyleProp<ViewStyle>
    title?: string
    textStyle?: StyleProp<TextStyle>
    numberStyle?: StyleProp<TextStyle>
    letterStyle?: StyleProp<TextStyle>
    /** 
     * 1: Years 2: Months 3: Days 4: Hours 5: Minutes 6: Seconds. 
     * Default is 1.
     * E.g. If set to 1, all values will be shown, if set to 6, only seconds will be shown.
    **/
    precision?: number
}

export const Timer = (props: TimerProps) => {
    const { date, style, title, textStyle, numberStyle, letterStyle, precision=1 } = props

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
    }, [precision])

    const calculate = () => {
        let date1 = dayjs(date).utc(true)
        let date2 = dayjs().utc(true)

        let yearDiff = 0
        let monthDiff = 0
        let dayDiff = 0
        let hourDiff = 0
        let minuteDiff = 0
        let secondDiff = 0

        if (precision === 1) {
            yearDiff = Math.floor(Math.trunc(date1.diff(date2, 'year', true)))
            date1 = date1.subtract(yearDiff, 'year')
            setYears(Math.abs(yearDiff))
            Math.abs(yearDiff) > 0 ? setShowYears(true) : setShowYears(false)
        } else {
            setShowYears(false)
        }
        
        if (precision <= 2) {
            monthDiff = Math.floor(Math.trunc(date1.diff(date2, 'month', true)))
            date1 = date1.subtract(monthDiff, 'month')
            setMonths(Math.abs(monthDiff))
            Math.abs(yearDiff) > 0 || Math.abs(monthDiff) > 0 ? setShowMonths(true) : setShowMonths(false)
        } else {
            setShowMonths(false)
        } 

        if (precision <= 3) {
            dayDiff = Math.floor(Math.trunc(date1.diff(date2, 'day', true)))
            date1 = date1.subtract(dayDiff, 'day')
            setDays(Math.abs(dayDiff))
            Math.abs(yearDiff) > 0 || Math.abs(monthDiff) > 0 || Math.abs(dayDiff) > 0 ? setShowDays(true) : setShowDays(false)
        } else {
            setShowDays(false)
        }

        if (precision <= 4) {
            const hourDiff = Math.floor(Math.trunc(date1.diff(date2, 'hour', true)))
            date1 = date1.subtract(hourDiff, 'hour')
            setHours(Math.abs(hourDiff))
            Math.abs(yearDiff) > 0 || Math.abs(monthDiff) > 0 || Math.abs(dayDiff) > 0 || Math.abs(hourDiff) > 0 ? setShowHours(true) : setShowHours(false)
        } else {
            setShowHours(false)
        }

        if (precision <= 5) {
            minuteDiff = Math.floor(Math.trunc(date1.diff(date2, 'minute', true)))
            date1 = date1.subtract(minuteDiff, 'minute')
            setMinutes(Math.abs(minuteDiff))
            Math.abs(yearDiff) > 0 || Math.abs(monthDiff) > 0 || Math.abs(dayDiff) > 0 || Math.abs(hourDiff) > 0 || Math.abs(minuteDiff) > 0 ? setShowHours(true) : setShowHours(false)
        } else {
            setShowMinutes(false)
        }

        secondDiff = Math.floor(Math.trunc(date1.diff(date2, 'second', true)))
        date1 = date1.subtract(secondDiff, 'second')
        setSeconds(Math.abs(secondDiff))
    }

    const styles = StyleSheet.create({
        container: {
           
        },  
    })

    const line = (num: number, letter: string) => (
        <Text style={textStyle} numberOfLines={1} adjustsFontSizeToFit>    
            <Text h1 style={numberStyle}>{formatNumberWithCommas(num)}</Text>
            <Text subtitle style={letterStyle}>{letter}</Text>
        </Text>
    )

    return (
        <>
            { showYears && line(years, "Years") }
            { showMonths && line(months, "Months") }
            { showDays && line(days, "Days") }
            { showHours && line(hours, "Hours") }
            { showMinutes && line(minutes, "Minutes") }
            { line(seconds, "Seconds") }      
        </>
    )
}