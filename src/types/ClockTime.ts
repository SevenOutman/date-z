import { MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE } from "./constants"

export interface IClockTime {
  getHours(): number
  getMinutes(): number
  getSeconds(): number
  getMilliseconds(): number
}

export class ClockTime implements IClockTime {
  static difference(time1: ClockTime, time2: ClockTime): number {
    return time1.valueOf() - time2.valueOf()
  }

  constructor(
    private hours: number,
    private minutes: number,
    private seconds: number = 0,
    private milliseconds: number = 0,
  ) {}

  getHours() {
    return this.hours
  }
  getMinutes() {
    return this.minutes
  }
  getSeconds() {
    return this.seconds
  }
  getMilliseconds() {
    return this.milliseconds
  }

  setHours(hours: number) {
    this.hours = hours
  }
  setMinutes(minutes: number) {
    this.minutes = minutes
  }
  setSeconds(seconds: number) {
    this.seconds = seconds
  }
  setMilliseconds(milliseconds: number) {
    this.milliseconds = milliseconds
  }

  /**
   * @returns The number of milliseconds in that day
   */
  valueOf() {
    return (
      this.hours * MILLISECONDS_IN_HOUR +
      this.minutes * MILLISECONDS_IN_MINUTE +
      this.seconds * 1000 +
      this.milliseconds
    )
  }

  toString() {
    return `${this.hours.toString().padStart(2, "0")}:${this.minutes
      .toString()
      .padStart(2, "0")}:${this.seconds
      .toString()
      .padStart(2, "0")}.${this.milliseconds.toString().padStart(3, "0")}`
  }
}
