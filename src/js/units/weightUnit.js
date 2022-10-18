import { converter } from '../../../modules/converter/src'

const weightUnit = {}

const weightUnits = converter.weightUnits
for (const unit of weightUnits) {
  const key = unit.toUpperCase()
  weightUnit[key] = unit
}

export const WeightUnit = Object.freeze(weightUnit)
