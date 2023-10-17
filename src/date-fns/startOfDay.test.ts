import { describe, it, expect } from "vitest"
import { startOfDay } from "./startOfDay"
import { ZonedDateTime } from "../types/ZonedDateTime"

describe("startOfDay", () => {
  it("returns the date with the time set to 00:00:00 in local timezone", () => {
    expect(startOfDay(new Date(2014, 8, 2)).getTime()).toEqual(
      new Date(2014, 8, 2, 0, 0, 0, 0).getTime(),
    )
  })
  it("returns the date with the time set to 00:00:00 in specific timezone", () => {
    expect(startOfDay(new Date(2014, 8, 2), "Europe/Dublin")).toEqual(
      new ZonedDateTime("2014-09-02T00:00:00.000+01:00", "Europe/Dublin"),
    )
  })
})
