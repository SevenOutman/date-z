# date-z

[![npm version](https://badgen.net/npm/v/@sevenoutman/date-z)](https://npm.im/@sevenoutman/date-z) [![npm downloads](https://badgen.net/npm/dm/@sevenoutman/date-z)](https://npm.im/@sevenoutman/date-z)
[![codecov](https://codecov.io/gh/SevenOutman/date-z/graph/badge.svg?token=5xJVmpIodz)](https://codecov.io/gh/SevenOutman/date-z)

Date-time API with timezone in mind.

## Install

```bash
npm i @sevenoutman/date-z
```

## Usage

> 🚧 This library is still in early development. API could change. Use with caution.

```js
import { ZonedDateTime } from "@sevenoutman/date-z"

const zonedDate = new ZonedDateTime(
  1409529600000, // "2014-09-01T00:00:00.000Z"
  "Europe/Dublin", // UTC+1
)

zonedDate.getHours() // 1
zonedDate.toString() // "2014-09-01T01:00:00.000+01:00[Europe/Dublin]"
```

## API

### CalendarDate

A calendar date is a date representation without time and timezone information.
It does **not** have an equivalent timestamp, because the same date could be represented by different timestamps in different timezones.

```js
import { CalendarDate } from "@sevenoutman/date-z"

const date = new CalendarDate(2014, 8, 1) // 2014-09-01
```

Calendar dates themselves can be compared with `CalendarDate.difference()` function.

```js
import { CalendarDate } from "@sevenoutman/date-z"

const date1 = new CalendarDate(2014, 8, 1) // 2014-09-01
const date2 = new CalendarDate(2014, 8, 2) // 2014-09-02

CalendarDate.difference(date1, date2) // -1
```

### Instant

A instant is a timestamp representation without timezone information.
It does **not** have an equivalent calendar date, because the same timestamp could be represented by different dates in different timezones.

```js
import { Instant } from "@sevenoutman/date-z"

const time = new Instant(1409526720000) // "2014-09-01T00:00:00.000Z"
```

To convert between a calendar date (or date-time) and timestamp requires specifying the context.

```js
import { Instant, CalendarDate } from "@sevenoutman/date-z"

const time = new Instant(1409526720000) // "2014-09-01T00:00:00.000+08:00"

time.toCalendarDate("Europe/Dublin") // { year: 2014, month: 7, date: 31 }
time.toCalendarDate("Asia/Shanghai") // { year: 2014, month: 8, date: 1 }
```

## Philosophy

The philosophy behind this library is similar to what's behind [Temporal proposal](https://github.com/tc39/proposal-temporal) -
A date-time representation does not have an equivalent timestamp, unless timezone is specified in the context, and vice versa.

## License

MIT &copy; [Doma](https://github.com/SevenOutman)
