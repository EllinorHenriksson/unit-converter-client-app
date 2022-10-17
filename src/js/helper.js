import { converter } from '../../modules/converter/src'

class Helper {
  validateMeasurementType (type) {
    if (type !== 'length' && type !== 'time' && type !== 'weight' && type !== 'volume' && type !== 'speed') {
      throw new Error('The attribute must be set to a string representing the available measurement types: length, time, weight, volume or speed. ')
    }
  }

  validateUnit (unit, type) {
    let units
    if (type === 'length') {
      units = converter.lengthUnits
    } else if (type === 'time') {
      units = converter.timeUnits
    } else if (type === 'weight') {
      units = converter.weightUnits
    } else if (type === 'volume') {
      units = converter.volumeUnits
    } else if (type === 'speed') {
      units = converter.speedUnits
    }

    if (!units.includes(unit)) {
      throw new Error(`The unit ${unit} is not a valid unit for the measurement type ${type}`)
    }
  }
}

export default new Helper()
