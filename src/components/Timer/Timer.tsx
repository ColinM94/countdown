import * as React from "react"
import { StyleProp, TextStyle, Text, View, ViewStyle } from "react-native"
import dayjs from "dayjs"
import { formatNumberWithCommas } from "common/helpers"
import { useTheme } from "contexts/ThemeContext"
import { useApp } from "contexts/AppContext"

interface TimerProps {
    /** Date  */
    date: Date
    /** If true shows "Seconds" instead of "S" */
    fullText?: boolean
    /**
     * 1: Years 2: Months 3: Days 4: Hours 5: Minutes 6: Seconds.
     * Default is 1.
     * E.g. If set to 1, all values will be shown, if set to 6, only seconds will be shown.
     **/
    precision?: number
    style?: StyleProp<ViewStyle>
    numberStyle?: StyleProp<TextStyle>
    textStyle?: StyleProp<TextStyle>
    /** Whether countdown is displayed vertically or horizontally. */
    direction: "row" | "column"
}

export const Timer = (props: TimerProps) => {
    const {
        date,
        style,
        numberStyle,
        textStyle,
        precision = 1,
        fullText = true,
        direction = "column",
    } = props

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

    const utc = require("dayjs/plugin/utc")
    dayjs.extend(utc)

    React.useEffect(() => {
        loading(true)
        calculate()
        loading(false)

        const timer = setInterval(() => {
            calculate()
        }, 1000)

        return () => clearInterval(timer)
    }, [precision, date])

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
            yearDiff = Math.floor(Math.trunc(date1.diff(date2, "year", true)))
            date1 = date1.subtract(yearDiff, "year")
            setYears(Math.abs(yearDiff))
            Math.abs(yearDiff) > 0 ? setShowYears(true) : setShowYears(false)
        } else {
            setShowYears(false)
        }

        if (precision <= 2) {
            monthDiff = Math.floor(Math.trunc(date1.diff(date2, "month", true)))
            date1 = date1.subtract(monthDiff, "month")
            setMonths(Math.abs(monthDiff))
            Math.abs(yearDiff) > 0 || Math.abs(monthDiff) > 0
                ? setShowMonths(true)
                : setShowMonths(false)
        } else {
            setShowMonths(false)
        }

        if (precision <= 3) {
            dayDiff = Math.floor(Math.trunc(date1.diff(date2, "day", true)))
            date1 = date1.subtract(dayDiff, "day")
            setDays(Math.abs(dayDiff))
            Math.abs(yearDiff) > 0 ||
            Math.abs(monthDiff) > 0 ||
            Math.abs(dayDiff) > 0
                ? setShowDays(true)
                : setShowDays(false)
        } else {
            setShowDays(false)
        }

        if (precision <= 4) {
            const hourDiff = Math.floor(
                Math.trunc(date1.diff(date2, "hour", true))
            )
            date1 = date1.subtract(hourDiff, "hour")
            setHours(Math.abs(hourDiff))
            Math.abs(yearDiff) > 0 ||
            Math.abs(monthDiff) > 0 ||
            Math.abs(dayDiff) > 0 ||
            Math.abs(hourDiff) > 0
                ? setShowHours(true)
                : setShowHours(false)
        } else {
            setShowHours(false)
        }

        if (precision <= 5) {
            minuteDiff = Math.floor(
                Math.trunc(date1.diff(date2, "minute", true))
            )
            date1 = date1.subtract(minuteDiff, "minute")
            setMinutes(Math.abs(minuteDiff))
            Math.abs(yearDiff) > 0 ||
            Math.abs(monthDiff) > 0 ||
            Math.abs(dayDiff) > 0 ||
            Math.abs(hourDiff) > 0 ||
            Math.abs(minuteDiff) > 0
                ? setShowHours(true)
                : setShowHours(false)
        } else {
            setShowMinutes(false)
        }

        secondDiff = Math.floor(Math.trunc(date1.diff(date2, "second", true)))
        date1 = date1.subtract(secondDiff, "second")
        setSeconds(Math.abs(secondDiff))
    }

    const displayNum = (num: number) => (
        <Text style={numberStyle}>{formatNumberWithCommas(num)}</Text>
    )

    const displayText = (text: string) => <Text style={textStyle}>{text}</Text>

    const line = (num: number, text: string) => (
        <Text numberOfLines={1} adjustsFontSizeToFit>
            {displayNum(num)}
            <Text></Text>
            {displayText(text)}
        </Text>
    )

    return (
        <>
            {direction === "column" && (
                <View style={style}>
                    {showYears && line(years, fullText ? "Years" : "Y")}
                    {showMonths && line(months, fullText ? "Months" : "M")}
                    {showDays && line(days, fullText ? "Days" : "D")}
                    {showHours && line(hours, fullText ? "Hours" : "H")}
                    {showMinutes && line(minutes, fullText ? "Minutes" : "M")}
                    {line(seconds, fullText ? "Seconds" : "S")}
                </View>
            )}
            {direction === "row" && (
                <View style={style}>
                    <Text adjustsFontSizeToFit numberOfLines={1}>
                        {showYears && (
                            <>
                                {displayNum(years)}
                                {displayText("Y ")}
                            </>
                        )}
                        {showMonths && (
                            <>
                                {displayNum(months)}
                                {displayText("M ")}
                            </>
                        )}
                        {showDays && (
                            <>
                                {displayNum(days)}
                                {displayText("D ")}
                            </>
                        )}
                        {showHours && (
                            <>
                                {displayNum(hours)}
                                {displayText("H ")}
                            </>
                        )}
                        {showMinutes && (
                            <>
                                {displayNum(minutes)}
                                {displayText("M ")}
                            </>
                        )}
                        <>
                            {displayNum(seconds)}
                            {displayText("S ")}
                        </>
                    </Text>
                </View>
            )}
        </>
    )
}
