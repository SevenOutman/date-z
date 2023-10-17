import { CalendarDateTime, ICalendarDate } from "../types/CalendarDate"
import { Timezone, TimezoneIdentifier } from "../types/Timezone"
import { ZonedDateTime } from "../types/ZonedDateTime"

export function startOfDay(
  date: ICalendarDate,
  timezone: TimezoneIdentifier = Timezone.getLocalTimezoneId(),
): ZonedDateTime {
  const cloned = new ZonedDateTime(
    new CalendarDateTime(date, 0, 0, 0, 0),
    timezone,
  )

  cloned.setHours(0, 0, 0, 0)

  return cloned
}
