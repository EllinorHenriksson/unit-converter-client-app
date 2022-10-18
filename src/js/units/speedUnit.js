import { converter } from '../../../modules/converter/src'

const speedUnit = {}

const speedUnits = converter.speedUnits
for (const unit of speedUnits) {
  const key = unit.toUpperCase()
  speedUnit[key] = unit
}

export const SpeedUnit = Object.freeze(speedUnit)
