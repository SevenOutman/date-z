import { ClockTime, IClockTime } from "./ClockTime"
import { MILLISECONDS_IN_DAY } from "./constants"
import { getDayNumberOfYear } from "./utils"

export interface ICalendarDate {
  getFullYear(): number
  getMonth(): number
  getDate(): number
}

export interface ICalendarDateTime extends ICalendarDate, IClockTime {}

export class CalendarDate implements ICalendarDate {
  static difference(date1: CalendarDate, date2: CalendarDate): number {
    return date1.valueOf() - date2.valueOf()
  }

  constructor(
    private year: number,
    private monthIndex: number,
    private date: number,
  ) {}

  getFullYear() {
    return this.year
  }
  getMonth() {
    return this.monthIndex
  }
  getDate() {
    return this.date
  }

  setFullYear(year: number) {
    this.year = year
  }
  setMonth(monthIndex: number) {
    this.monthIndex = monthIndex
  }
  setDate(date: number) {
    this.date = date
  }

  toString() {
    return `${this.year}-${(this.monthIndex + 1)
      .toString()
      .padStart(2, "0")}-${this.date.toString().padStart(2, "0")}`
  }

  /**
   * @returns The number of this day in this year
   */
  valueOf() {
    return getDayNumberOfYear(this.year, this.monthIndex, this.date)
  }
}

export class CalendarDateTime implements ICalendarDateTime {
  static from(calendarDateTime: ICalendarDateTime) {
    return new CalendarDateTime(
      calendarDateTime.getFullYear(),
      calendarDateTime.getMonth(),
      calendarDateTime.getDate(),
      calendarDateTime.getHours(),
      calendarDateTime.getMinutes(),
      calendarDateTime.getSeconds(),
      calendarDateTime.getMilliseconds(),
    )
  }

  #calendarDate: CalendarDate
  #clockTime: ClockTime

  constructor(
    date: ICalendarDate,
    hours: number,
    minutes: number,
    seconds?: number,
    milliseconds?: number,
  )

  constructor(
    year: number,
    monthIndex: number,
    date: number,
    hours: number,
    minutes: number,
    seconds?: number,
    milliseconds?: number,
  )
  constructor(...args: any[]) {
    if (typeof args[0] !== "number") {
      this.#calendarDate = args[0]
      this.#clockTime = new ClockTime(args[1], args[2], args[3], args[4])
    } else {
      this.#calendarDate = new CalendarDate(args[0], args[1], args[2])
      this.#clockTime = new ClockTime(args[3], args[4], args[5], args[6])
    }
  }

  getFullYear() {
    return this.#calendarDate.getFullYear()
  }
  getMonth() {
    return this.#calendarDate.getMonth()
  }
  getDate() {
    return this.#calendarDate.getDate()
  }
  getHours() {
    return this.#clockTime.getHours()
  }
  getMinutes() {
    return this.#clockTime.getMinutes()
  }
  getSeconds() {
    return this.#clockTime.getSeconds()
  }
  getMilliseconds() {
    return this.#clockTime.getMilliseconds()
  }

  setFullYear(year: number) {
    this.#calendarDate.setFullYear(year)
  }
  setMonth(monthIndex: number) {
    this.#calendarDate.setMonth(monthIndex)
  }
  setDate(date: number) {
    this.#calendarDate.setDate(date)
  }
  setHours(hours: number) {
    this.#clockTime.setHours(hours)
  }
  setMinutes(minutes: number) {
    this.#clockTime.setMinutes(minutes)
  }
  setSeconds(seconds: number) {
    this.#clockTime.setSeconds(seconds)
  }
  setMilliseconds(milliseconds: number) {
    this.#clockTime.setMilliseconds(milliseconds)
  }

  valueOf(): number {
    return (
      (this.#calendarDate.valueOf() - 1) * MILLISECONDS_IN_DAY +
      this.#clockTime.valueOf()
    )
  }

  toString() {
    return `${this.#calendarDate.toString()}T${this.#clockTime.toString()}`
  }
}
