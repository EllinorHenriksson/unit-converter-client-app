
import { converter } from '../../modules/converter/src'

const measurementType = {}

const measurementTypes = converter.measurementTypes
for (const type of measurementTypes) {
  const key = type.toUpperCase()
  measurementType[key] = type
}

export const MeasurementType = Object.freeze(measurementType)
