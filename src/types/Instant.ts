import { CalendarDate, CalendarDateTime } from "./CalendarDate"
import { ClockTime } from "./ClockTime"
import { Timezone, TimezoneIdentifier } from "./Timezone"
import { ZonedDateTime } from "./ZonedDateTime"

export type Timestamp = number

export interface IInstant {
  getTime(): Timestamp
}

export class Instant implements IInstant {
  #timestamp: Timestamp

  constructor(time: Timestamp) {
    this.#timestamp = time
  }

  getTime() {
    return this.#timestamp
  }
  toClockTime(
    timezone: TimezoneIdentifier = Timezone.getLocalTimezoneId(),
  ): ClockTime {
    const z = this.toZonedDateTime(timezone)

    return new ClockTime(
      z.getHours(),
      z.getMinutes(),
      z.getSeconds(),
      z.getMilliseconds(),
    )
  }

  toCalendarDate(
    timezone: TimezoneIdentifier = Timezone.getLocalTimezoneId(),
  ): CalendarDate {
    const tz = Timezone.of(timezone)
    const esDate = new Date(this.#timestamp)
    esDate.setMinutes(
      esDate.getMinutes() + tz.offset - esDate.getTimezoneOffset(),
    )

    return new CalendarDate(
      esDate.getFullYear(),
      esDate.getMonth(),
      esDate.getDate(),
    )
  }

  toCalendarDateTime(
    timezone: TimezoneIdentifier = Timezone.getLocalTimezoneId(),
  ): CalendarDateTime {
    const tz = Timezone.of(timezone)
    const esDate = new Date(this.#timestamp)
    esDate.setMinutes(
      esDate.getMinutes() + tz.offset - esDate.getTimezoneOffset(),
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

  toZonedDateTime(timezone: TimezoneIdentifier): ZonedDateTime {
    return new ZonedDateTime(this.#timestamp, timezone)
  }

  valueOf() {
    return this.#timestamp
  }
}
