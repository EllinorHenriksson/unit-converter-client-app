import { converter } from '../../../modules/converter/src'

const lengthUnit = {}

const lengthUnits = converter.lengthUnits
for (const unit of lengthUnits) {
  const key = unit.toUpperCase()
  lengthUnit[key] = unit
}

export const LengthUnit = Object.freeze(lengthUnit)
