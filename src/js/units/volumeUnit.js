import { converter } from '../../../modules/converter/src'

const volumeUnit = {}

const volumeUnits = converter.volumeUnits
for (const unit of volumeUnits) {
  const key = unit.toUpperCase()
  volumeUnit[key] = unit
}

export const VolumeUnit = Object.freeze(volumeUnit)
