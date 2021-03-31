
// Takes in a JS date object and returns a formatted date string. 
export function formatDate(date: Date) {
    try {
        let day = ("0" + date.getDate()).slice(-2) // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/18610204
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear()
        return day + "/" + month + "/" + year
    } catch (error) {
        //alert(error.message)
    }
}

// Takes JS Date object and returns formatted time string.
export function formatTime(date: Date) {
    try {
        return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
    } catch (error) {
        //alert(error.message)
    }
}

export function timeSince(date: Date) {
    var seconds = Math.floor((new Date() - date) / 1000)

    const years = Math.floor(seconds / 31536000)
    seconds %= 31536000

    const months = Math.floor(seconds / 2678400)
    seconds %= 2678400

    const days = Math.floor(seconds / 86400)
    seconds %= 86400

    const hours = Math.floor(seconds / 3600)
    seconds %= 3600

    const minutes = Math.floor(seconds / 60)
    seconds %= 60

    let yearsString = years == 0 ? "" : `${years} years `
    let monthsString = months == 0 ? "" : `${months} months `
    let daysString = days == 0 ? "" : `${days} days `
    let hoursString = hours == 0 ? "" : `${hours} hours `
    let secondsString = seconds == 0 ? "" : `${seconds} seconds`

    return yearsString + monthsString + daysString + hoursString + secondsString
}
