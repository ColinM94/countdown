import * as React from "react"
import { View } from "react-native"
import { Text } from "./Text"
import dayjs from "dayjs"
import { formatDate, formatTime } from "common/helpers"
import { useLoading } from "contexts"

type TimerProps = {
    date: Date,
    style?: {}
}

export const Timer = ({ date, style }: TimerProps) => {
    const [years, setYears] = React.useState(0)
    const [months, setMonths] = React.useState(0)
    const [days, setDays] = React.useState(0)
    const [hours, setHours] = React.useState(0)
    const [minutes, setMinutes] = React.useState(0)
    const [seconds, setSeconds] = React.useState(0)

    const { loading } = useLoading()

    React.useEffect(() => {
        loading(true)
        calculate()
        loading(false)

        const timer = setInterval(() => {
            /* setSeconds(prev => prev + 1) */
            calculate()
        }, 1000)

        return () => clearInterval(timer)
    }, [])


    /*     React.useEffect(() => {
            // Recalculates once per minute. 
            if (seconds >= 59) {
                setSeconds(0)
                calculate()
            }
        }, [seconds]) */

    const calculate = () => {
        var utc = require('dayjs/plugin/utc')
        dayjs.extend(utc)

        let date1 = dayjs(date).utc(true)
        let date2 = dayjs().utc(true)

        const yearDiff = Math.floor(Math.trunc(date1.diff(date2, 'year', true)))
        date1 = date1.subtract(yearDiff, 'year')

        const monthDiff = Math.floor(Math.trunc(date1.diff(date2, 'month', true)))
        date1 = date1.subtract(monthDiff, 'month')

        const dayDiff = Math.floor(Math.trunc(date1.diff(date2, 'day', true)))
        date1 = date1.subtract(dayDiff, 'day')

        const hourDiff = Math.floor(Math.trunc(date1.diff(date2, 'hour', true)))
        date1 = date1.subtract(hourDiff, 'hour')

        const minuteDiff = Math.floor(Math.trunc(date1.diff(date2, 'minute', true)))
        date1 = date1.subtract(minuteDiff, 'minute')

        const secondDiff = Math.floor(Math.trunc(date1.diff(date2, 'second', true)))
        date1 = date1.subtract(secondDiff, 'second')

        setYears(Math.abs(yearDiff))
        setMonths(Math.abs(monthDiff))
        setDays(Math.abs(dayDiff))
        setHours(Math.abs(hourDiff))
        setMinutes(Math.abs(minuteDiff))
        setSeconds(Math.abs(secondDiff))
    }

    return (
        <View style={style}>
            <Text>{`${formatDate(date)} @ ${formatTime(date)}`}</Text>
            <Text></Text>
            <Text>{`Years: ${years}`}</Text>
            <Text>{`Months: ${months}`}</Text>
            <Text>{`Days: ${days}`}</Text>
            <Text>{`Hours: ${hours}`}</Text>
            <Text>{`Minutes: ${minutes}`}</Text>
            <Text>{`Seconds: ${seconds}`}</Text>
        </View>
    )
}