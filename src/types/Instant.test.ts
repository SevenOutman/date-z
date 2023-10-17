import { describe, test, expect } from "vitest"
import { Instant } from "./Instant"
import { ZonedDateTime } from "./ZonedDateTime"

describe("Instant", () => {
  describe("constructors", () => {
    test("new Instant(timestamp)", () => {
      const instant = new Instant(1409529600000) // "2014-09-01T00:00:00.000Z"
      expect(instant.getTime()).toBe(1409529600000)
    })
  })
  test(".toZonedDateTime()", () => {
    const instant = new Instant(1409529600000) // "2014-09-01T00:00:00.000Z"

    expect(instant.toZonedDateTime("Europe/Dublin")).toEqual(
      new ZonedDateTime("2014-09-01T01:00:00.000+01:00", "Europe/Dublin"),
    )
  })

  test(".toCalendarDate(timezone)", () => {
    const instant = new Instant(1409529600000) // "2014-09-01T00:00:00.000Z"

    const calendarDate = instant.toCalendarDate()

    expect(calendarDate.getFullYear()).toBe(2014)
    expect(calendarDate.getMonth()).toBe(8)
    expect(calendarDate.getDate()).toBe(1)
  })

  test(".toClockTime(timezone)", () => {
    const instant = new Instant(1409529600000) // "2014-09-01T01:00:00.000+01:00[Europe/Dublin]"

    const clockTime = instant.toClockTime("Europe/Dublin")

    expect(clockTime.getHours()).toBe(1)
    expect(clockTime.getMinutes()).toBe(0)
    expect(clockTime.getSeconds()).toBe(0)
    expect(clockTime.getMilliseconds()).toBe(0)
  })
})
