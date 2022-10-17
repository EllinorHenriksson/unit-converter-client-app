import { converter } from '../../modules/converter/src'

/**
 * Represents a helper module with various helper methods.
 */
class Helper {
  /**
   * Validates a measurement type.
   *
   * @param {string} type The measurement type (e.g. "length").
   * @throws {Error} Throws an error if the passed value is not one of the allowed types (length, time, weight, volume, speed)
   */
  validateMeasurementType (type) {
    if (type !== 'length' && type !== 'time' && type !== 'weight' && type !== 'volume' && type !== 'speed') {
      throw new Error('The attribute must be set to a string representing the available measurement types: length, time, weight, volume or speed. ')
    }
  }

  /**
   * Validates a unit that must be of a valid measurement type.
   *
   * @param {string} unit The unit to validate.
   * @param {string} type The measurement type.
   * @throws {Error} Throws an error if the unit or the type aren't accurate.
   */
  validateUnit (unit, type) {
    this.validateMeasurementType(type)
    const units = this.getUnits(type)
    if (!units.includes(unit)) {
      throw new Error(`The unit ${unit} is not a valid unit for the measurement type ${type}`)
    }
  }

  /**
   * Gets the units of the passed measurement type.
   *
   * @param {string} type The measurement type (e.g. "length").
   * @returns {string[]} The units of the measurement type.
   */
  getUnits (type) {
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
    return units
  }
}

export default new Helper()
