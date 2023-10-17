import { describe, expect, test } from "vitest"
import { CalendarDate, CalendarDateTime } from "./CalendarDate"

describe("CalendarDate", () => {
  describe("constructors", () => {
    test("new CalendarDate(year, monthIndex, date)", () => {
      const calendarDate = new CalendarDate(2014, 8, 1)
      expect(calendarDate.getFullYear()).toBe(2014)
      expect(calendarDate.getMonth()).toBe(8)
      expect(calendarDate.getDate()).toBe(1)
    })
  })
  test(".valueOf() returns the number of this date in this year", () => {
    const calendarDate = new CalendarDate(2014, 8, 1)
    expect(calendarDate.valueOf()).toBe(244)
  })
  test(".toString()", () => {
    const calendarDate = new CalendarDate(2014, 8, 1)
    expect(calendarDate.toString()).toBe("2014-09-01")
  })

  describe("CalendarDate.difference", () => {
    test("returns the difference between two dates in calendar days", () => {
      const calendarDate1 = new CalendarDate(2014, 8, 1)
      const calendarDate2 = new CalendarDate(2014, 8, 2)
      expect(CalendarDate.difference(calendarDate1, calendarDate2)).toBe(-1)
    })
  })
})

describe("CalendarDateTime", () => {
  describe("constructors", () => {
    test("new CalenderDateTime(year, monthIndex, date, hours, minutes)", () => {
      const calendarDateTime = new CalendarDateTime(2014, 8, 1, 1, 0, 0, 0)
      expect(calendarDateTime.getFullYear()).toBe(2014)
      expect(calendarDateTime.getMonth()).toBe(8)
      expect(calendarDateTime.getDate()).toBe(1)
      expect(calendarDateTime.getHours()).toBe(1)
      expect(calendarDateTime.getMinutes()).toBe(0)
      expect(calendarDateTime.getSeconds()).toBe(0)
      expect(calendarDateTime.getMilliseconds()).toBe(0)
    })
    test("new CalenderDateTime(year, monthIndex, date, hours, minutes, seconds)", () => {
      const calendarDateTime = new CalendarDateTime(2014, 8, 1, 1, 0, 0, 0)
      expect(calendarDateTime.getFullYear()).toBe(2014)
      expect(calendarDateTime.getMonth()).toBe(8)
      expect(calendarDateTime.getDate()).toBe(1)
      expect(calendarDateTime.getHours()).toBe(1)
      expect(calendarDateTime.getMinutes()).toBe(0)
      expect(calendarDateTime.getSeconds()).toBe(0)
      expect(calendarDateTime.getMilliseconds()).toBe(0)
    })
    test("new CalenderDateTime(year, monthIndex, date, hours, minutes, seconds, milliseconds)", () => {
      const calendarDateTime = new CalendarDateTime(2014, 8, 1, 1, 0, 0, 0)
      expect(calendarDateTime.getFullYear()).toBe(2014)
      expect(calendarDateTime.getMonth()).toBe(8)
      expect(calendarDateTime.getDate()).toBe(1)
      expect(calendarDateTime.getHours()).toBe(1)
      expect(calendarDateTime.getMinutes()).toBe(0)
      expect(calendarDateTime.getSeconds()).toBe(0)
      expect(calendarDateTime.getMilliseconds()).toBe(0)
    })

    test("new CalenderDateTime(calendarDate, hours, minutes)", () => {
      const calendarDate = new CalendarDate(2014, 8, 1)
      const calendarDateTime = new CalendarDateTime(calendarDate, 1, 0, 0, 0)
      expect(calendarDateTime.getFullYear()).toBe(2014)
      expect(calendarDateTime.getMonth()).toBe(8)
      expect(calendarDateTime.getDate()).toBe(1)
      expect(calendarDateTime.getHours()).toBe(1)
      expect(calendarDateTime.getMinutes()).toBe(0)
      expect(calendarDateTime.getSeconds()).toBe(0)
      expect(calendarDateTime.getMilliseconds()).toBe(0)
    })
    test("new CalenderDateTime(calendarDate, hours, minutes, seconds)", () => {
      const calendarDate = new CalendarDate(2014, 8, 1)
      const calendarDateTime = new CalendarDateTime(calendarDate, 1, 0, 0, 0)
      expect(calendarDateTime.getFullYear()).toBe(2014)
      expect(calendarDateTime.getMonth()).toBe(8)
      expect(calendarDateTime.getDate()).toBe(1)
      expect(calendarDateTime.getHours()).toBe(1)
      expect(calendarDateTime.getMinutes()).toBe(0)
      expect(calendarDateTime.getSeconds()).toBe(0)
      expect(calendarDateTime.getMilliseconds()).toBe(0)
    })
    test("new CalenderDateTime(calendarDate, hours, minutes, seconds, milliseconds)", () => {
      const calendarDate = new CalendarDate(2014, 8, 1)
      const calendarDateTime = new CalendarDateTime(calendarDate, 1, 0, 0, 0)
      expect(calendarDateTime.getFullYear()).toBe(2014)
      expect(calendarDateTime.getMonth()).toBe(8)
      expect(calendarDateTime.getDate()).toBe(1)
      expect(calendarDateTime.getHours()).toBe(1)
      expect(calendarDateTime.getMinutes()).toBe(0)
      expect(calendarDateTime.getSeconds()).toBe(0)
      expect(calendarDateTime.getMilliseconds()).toBe(0)
    })
  })
  test(".valueOf() returns the number of milliseconds of this moment in this year", () => {
    const calendarDateTime = new CalendarDateTime(2014, 0, 1, 1, 0, 0, 0)
    expect(calendarDateTime.valueOf()).toBe(3600000)
  })
  test(".toString()", () => {
    const calendarDateTime = new CalendarDateTime(2014, 8, 1, 1, 0, 0, 0)
    expect(calendarDateTime.toString()).toBe("2014-09-01T01:00:00.000")
  })
})
