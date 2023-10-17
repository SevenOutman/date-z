import { describe, expect, test } from "vitest"
import { ZonedDateTime } from "./ZonedDateTime"
import { ICalendarDateTime } from "./CalendarDate"

describe("ZonedDate", () => {
  test("new ZonedDate(timestamp, timezone)", () => {
    const time = 1409529600000 // "2014-09-01T00:00:00.000Z"
    const zonedDate = new ZonedDateTime(1409529600000, "Europe/Dublin")

    expect(zonedDate.getTime()).toBe(time)
    expect(zonedDate.getTimezone().id).toBe("Europe/Dublin")
    expect(zonedDate.getFullYear()).toBe(2014)
    expect(zonedDate.getMonth()).toBe(8)
    expect(zonedDate.getDate()).toBe(1)
    expect(zonedDate.getHours()).toBe(1)
    expect(zonedDate.getMinutes()).toBe(0)
    expect(zonedDate.getSeconds()).toBe(0)
    expect(zonedDate.getMilliseconds()).toBe(0)
  })

  test("new ZonedDate(calenderDateTime, timezone)", () => {
    const calenderDateTime: ICalendarDateTime = {
      getFullYear: () => 2014,
      getMonth: () => 8,
      getDate: () => 1,
      getHours: () => 1,
      getMinutes: () => 0,
      getSeconds: () => 0,
      getMilliseconds: () => 0,
    }
    const zonedDate = new ZonedDateTime(calenderDateTime, "Europe/Dublin")

    expect(zonedDate.getTime()).toBe(1409529600000)
    expect(zonedDate.getTimezone().id).toBe("Europe/Dublin")
    expect(zonedDate.getFullYear()).toBe(2014)
    expect(zonedDate.getMonth()).toBe(8)
    expect(zonedDate.getDate()).toBe(1)
    expect(zonedDate.getHours()).toBe(1)
    expect(zonedDate.getMinutes()).toBe(0)
    expect(zonedDate.getSeconds()).toBe(0)
    expect(zonedDate.getMilliseconds()).toBe(0)
  })

  test(".toString()", () => {
    const zonedDate = new ZonedDateTime(
      1409529600000, // "2014-09-01T00:00:00.000Z"
      "Europe/Dublin",
    )

    expect(zonedDate.toString()).toBe(
      "2014-09-01T01:00:00.000+01:00[Europe/Dublin]",
    )

    zonedDate.setTimezone("Asia/Shanghai")
    expect(zonedDate.toString()).toBe(
      "2014-09-01T08:00:00.000+08:00[Asia/Shanghai]",
    )
  })
})
