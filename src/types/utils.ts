import { CalendarDateTime, ICalendarDateTime } from "./CalendarDate"
import { Timestamp } from "./Instant"
import { Timezone, TimezoneIdentifier } from "./Timezone"

export function toTimestamp(
  calenderDateTime: ICalendarDateTime,
  timezone: TimezoneIdentifier,
): Timestamp {
  const esDate = new Date(
    calenderDateTime.getFullYear(),
    calenderDateTime.getMonth(),
    calenderDateTime.getDate(),
    calenderDateTime.getHours(),
    calenderDateTime.getMinutes(),
    calenderDateTime.getSeconds(),
    calenderDateTime.getMilliseconds(),
  )
  esDate.setMinutes(
    esDate.getMinutes() -
      (esDate.getTimezoneOffset() - Timezone.of(timezone).offset),
  )
  return esDate.getTime()
}

export function toCalendarDateTime(
  timestamp: Timestamp,
  timezone: TimezoneIdentifier,
): CalendarDateTime {
  const esDate = new Date(timestamp)
  esDate.setMinutes(
    esDate.getMinutes() +
      esDate.getTimezoneOffset() -
      Timezone.of(timezone).offset,
  )
  return new CalendarDateTime(
    esDate.getFullYear(),
    esDate.getMonth(),
    esDate.getDate(),
    esDate.getHours(),
    esDate.getMinutes(),
    esDate.getSeconds(),
    esDate.getMilliseconds(),
  )
}

/**
 * @param offset Offset in minutes
 */
export function toTimezoneOffsetString(offset: number) {
  const sign = offset > 0 ? "-" : "+"
  const absOffset = Math.abs(offset)
  const hours = Math.floor(absOffset / 60)
  const minutes = absOffset % 60
  return `${sign}${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
}

export function isLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

export function getDayNumberOfYear(
  year: number,
  monthIndex: number,
  date: number,
) {
  const daysOfMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
  ]
  return daysOfMonth
    .slice(0, monthIndex)
    .reduce((acc, days) => acc + days, date)
}
