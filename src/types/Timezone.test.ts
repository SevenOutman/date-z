import { describe, expect, test } from "vitest"
import { Timezone } from "./Timezone"

describe("Timezone", () => {
  describe("Timezone.of()", () => {
    test("returns a Timezone instance", () => {
      const timezone = Timezone.of("Europe/Dublin")
      expect(timezone).toBeInstanceOf(Timezone)
      expect(timezone.id).toBe("Europe/Dublin")
      expect(timezone.offset).toBe(-60)
    })
  })

  test(".toString()", () => {
    expect(Timezone.of("Europe/Dublin").toString()).toBe(
      "+01:00[Europe/Dublin]",
    )
    expect(Timezone.of("Asia/Shanghai").toString()).toBe(
      "+08:00[Asia/Shanghai]",
    )
  })
})
