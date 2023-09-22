import { describe, expect, test } from "vitest"
import {
  toCalendarDateTime,
  toTimestamp,
  toTimezoneOffsetString,
} from "./utils"

describe("toTimestamp", () => {
  test("should convert a calendar date and timezone to a timestamp", () => {
    const calendarDateTime = {
      getFullYear: () => 2014,
      getMonth: () => 8,
      getDate: () => 1,
      getHours: () => 1,
      getMinutes: () => 0,
      getSeconds: () => 0,
      getMilliseconds: () => 0,
    }

    const expectedTimestamp = 1409529600000 // "2014-09-01T01:00:00.000+01:00"
    const actualTimestamp = toTimestamp(calendarDateTime, "Europe/Dublin")
    expect(actualTimestamp).toEqual(expectedTimestamp)
  })
})

describe("toCalendarDateTime", () => {
  test("should convert a timestamp and timezone to a calendar date", () => {
    const timestamp = 1409529600000 // "2014-09-01T01:00:00.000+01:00"
    const calenderDateTime = toCalendarDateTime(timestamp, "Europe/Dublin")

    expect(calenderDateTime.getFullYear()).toBe(2014)
    expect(calenderDateTime.getMonth()).toBe(8)
    expect(calenderDateTime.getDate()).toBe(1)
    expect(calenderDateTime.getHours()).toBe(1)
    expect(calenderDateTime.getMinutes()).toBe(0)
    expect(calenderDateTime.getSeconds()).toBe(0)
  })
})

describe("toTimezoneOffsetString", () => {
  test("should convert a timezone offset to a string", () => {
    expect(toTimezoneOffsetString(-60)).toBe("+01:00")
    expect(toTimezoneOffsetString(60)).toBe("-01:00")
    expect(toTimezoneOffsetString(-120)).toBe("+02:00")
    expect(toTimezoneOffsetString(120)).toBe("-02:00")
    expect(toTimezoneOffsetString(-90)).toBe("+01:30")
    expect(toTimezoneOffsetString(90)).toBe("-01:30")
  })
})
