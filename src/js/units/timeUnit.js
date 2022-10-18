import { converter } from '../../../modules/converter/src'

const timeUnit = {}

const timeUnits = converter.timeUnits
for (const unit of timeUnits) {
  const key = unit.toUpperCase()
  timeUnit[key] = unit
}

export const TimeUnit = Object.freeze(timeUnit)
