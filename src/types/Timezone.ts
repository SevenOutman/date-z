import { toTimezoneOffsetString } from "./utils"

export type TimezoneIdentifier = string

export class Timezone {
  private constructor(private _id: TimezoneIdentifier) {}

  private static __cache: Map<TimezoneIdentifier, Timezone>

  private static get cache() {
    if (!this.__cache) {
      this.__cache = new Map()
    }
    return this.__cache
  }

  private static __db: Map<TimezoneIdentifier, number>

  private static get db() {
    if (!this.__db) {
      this.__db = new Map()
    }
    return this.__db
  }

  get id(): TimezoneIdentifier {
    return this._id
  }

  get offset(): number {
    if (Timezone.db.has(this.id)) {
      return Timezone.db.get(this.id) as number
    }

    const offset = getTimezoneOffset(this.id)
    Timezone.db.set(this.id, offset)
    return offset
  }

  static getLocalTimezone() {
    return Timezone.of(Timezone.getLocalTimezoneId())
  }
  static getLocalTimezoneId() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  static of(id: TimezoneIdentifier): Timezone {
    if (Timezone.cache.has(id)) {
      return Timezone.cache.get(id) as Timezone
    }

    const timezone = new Timezone(id)
    Timezone.cache.set(id, timezone)
    return timezone
  }

  toString() {
    return `${toTimezoneOffsetString(this.offset)}[${this.id}]`
  }
}

/**
 * Get the difference between:
 * - The timestamp for a given date in the given
 * - The timestamp for the same date in UTC
 */
const getTimezoneOffset = (timezone: TimezoneIdentifier) => {
  const timeZoneName = Intl.DateTimeFormat("en", {
    timeZoneName: "short",
    timeZone: timezone,
  })
    .formatToParts()
    .find((i) => i.type === "timeZoneName")?.value

  if (!timeZoneName) {
    throw new Error("Invalid time zone name")
  }

  // timeZoneName would either be GMT+n, GMT-n or UTC
  // See https://github.com/SevenOutman/date-z/actions/runs/6547496449/job/17780095427?pr=1
  if (timeZoneName === "UTC") return 0

  const match = timeZoneName.match(/^GMT([+\-]\d+)$/)
  if (!match) {
    throw new Error("Invalid time zone name")
  }

  return -parseInt(match[1], 10) * 60
}
