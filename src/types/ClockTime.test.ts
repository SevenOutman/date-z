import { describe, test, expect } from "vitest"
import { ClockTime } from "./ClockTime"

describe("ClockTime", () => {
  describe("constructors", () => {
    test("new ClockTime(hours, minutes)", () => {
      const clockTime = new ClockTime(9, 41)
      expect(clockTime.getHours()).toBe(9)
      expect(clockTime.getMinutes()).toBe(41)
      expect(clockTime.getSeconds()).toBe(0)
      expect(clockTime.getMilliseconds()).toBe(0)
    })
    test("new ClockTime(hours, minutes, seconds)", () => {
      const clockTime = new ClockTime(9, 41, 30)
      expect(clockTime.getHours()).toBe(9)
      expect(clockTime.getMinutes()).toBe(41)
      expect(clockTime.getSeconds()).toBe(30)
      expect(clockTime.getMilliseconds()).toBe(0)
    })
    test("new ClockTime(hours, minutes, seconds, milliseconds)", () => {
      const clockTime = new ClockTime(9, 41, 30, 500)
      expect(clockTime.getHours()).toBe(9)
      expect(clockTime.getMinutes()).toBe(41)
      expect(clockTime.getSeconds()).toBe(30)
      expect(clockTime.getMilliseconds()).toBe(500)
    })
  })
  test(".toString()", () => {
    const clockTime = new ClockTime(1, 0)
    expect(clockTime.toString()).toBe("01:00:00.000")
  })
  test(".valueOf()", () => {
    const clockTime = new ClockTime(1, 0)
    expect(clockTime.valueOf()).toBe(3600000)
  })

  test("ClockTime.difference", () => {
    expect(ClockTime.difference(new ClockTime(2, 0), new ClockTime(1, 0))).toBe(
      3600000,
    )
  })
})
