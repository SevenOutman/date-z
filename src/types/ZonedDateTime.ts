import { ICalendarDateTime } from "./CalendarDate"
import { IInstant, Instant, Timestamp } from "./Instant"
import { Timezone, TimezoneIdentifier } from "./Timezone"
import { toTimestamp } from "./utils"

export interface IZonedDateTime extends ICalendarDateTime, IInstant {
  getTimezone(): Timezone
}

export class ZonedDateTime implements IZonedDateTime {
  /**
   * timestamp 是 ZonedDate 所指示时间的 single source-of-truth
   */
  #timestamp: Timestamp
  #timezone: Timezone

  /**
   * 由 timestamp 与 timezone 计算得到的 Date 对象，用于实现 CalenderDateTime 接口
   */
  #calendarDateTime: Date

  constructor(time: Timestamp | string, timezone: TimezoneIdentifier)
  constructor(calenderDateTime: ICalendarDateTime, timezone: TimezoneIdentifier)
  constructor(
    time: Timestamp | string | ICalendarDateTime,
    timezone: TimezoneIdentifier,
  ) {
    this.#timestamp =
      typeof time === "number"
        ? time
        : typeof time === "string"
        ? new Date(time).getTime()
        : toTimestamp(time, timezone)

    this.#timezone = Timezone.of(timezone)

    this.#calendarDateTime = (() => {
      if (typeof time === "number" || typeof time === "string") {
        const esDate = new Date(time)
        esDate.setMinutes(
          esDate.getMinutes() +
            esDate.getTimezoneOffset() -
            this.#timezone.offset,
        )

        return esDate
      }

      return new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds(),
      )
    })()
  }

  getFullYear(): number {
    return this.#calendarDateTime.getFullYear()
  }
  getMonth(): number {
    return this.#calendarDateTime.getMonth()
  }
  getDate(): number {
    return this.#calendarDateTime.getDate()
  }
  getTime(): number {
    return this.#timestamp
  }

  getTimezoneOffset(): number {
    return this.getTimezone().offset
  }

  getHours(): number {
    return this.#calendarDateTime.getHours()
  }

  setHours(...args: Parameters<Date["setHours"]>): number {
    const prevCalenderTime = new Date(this.#calendarDateTime as Date)

    this.#calendarDateTime.setHours(...args)

    this.#timestamp =
      this.getTime() +
      (this.#calendarDateTime.getTime() - prevCalenderTime.getTime())

    return this.getTime()
  }

  getMinutes(): number {
    return this.#calendarDateTime.getMinutes()
  }

  getSeconds(): number {
    return this.#calendarDateTime.getSeconds()
  }

  getMilliseconds(): number {
    return this.#calendarDateTime.getMilliseconds()
  }

  getTimezone() {
    return this.#timezone
  }

  setTimezone(timezone: TimezoneIdentifier) {
    this.#timezone = Timezone.of(timezone)
  }

  toInstant() {
    return new Instant(this.getTime())
  }

  toString() {
    const timezoneOffset = this.getTimezoneOffset()
    if (timezoneOffset === 0) return this.#calendarDateTime.toISOString()

    const esDateInLocalTimezone = new Date(this.#timestamp)

    // 这时 esDateInLocalTimezone 的 CalenderDate 以及 ClockTime 就是我们想要的结果
    esDateInLocalTimezone.setMinutes(
      esDateInLocalTimezone.getMinutes() - timezoneOffset,
    )
    return esDateInLocalTimezone
      .toISOString()
      .replace("Z", this.#timezone.toString())
  }
  [Symbol.toPrimitive](hint: "default"): string
  [Symbol.toPrimitive](hint: "number"): number
  [Symbol.toPrimitive](hint: "string"): string
  [Symbol.toPrimitive](hint: "default" | "number" | "string") {
    if (hint === "default" || hint === "string") {
      return this.toString()
    }
    return this.#calendarDateTime[Symbol.toPrimitive](hint)
  }
}
