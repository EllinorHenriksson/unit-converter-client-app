import { MeasurementType } from './measurementType'
import { LengthUnit } from './units/lengthUnit'
import { TimeUnit } from './units/timeUnit'
import { WeightUnit } from './units/weightUnit'
import { VolumeUnit } from './units/volumeUnit'
import { SpeedUnit } from './units/speedUnit'

/**
 * Represents a helper module with various helper methods.
 */
class Helper {
  /**
   * Validates a measurement type.
   *
   * @param {MeasurementType} type The measurement type (e.g. "length").
   * @throws {Error} Throws an error if the passed value is not one of the allowed types (length, time, weight, volume, speed)
   */
  validateMeasurementType (type) {
    const types = Object.values(MeasurementType).join(', ')
    const message = `The type must be a string representing one of the available measurement types: ${types}`

    if (!types.includes(type)) {
      throw new Error(message)
    }
  }

  /**
   * Validates a unit that must be of a valid measurement type.
   *
   * @param {string} unit The unit to validate.
   * @param {MeasurementType} type The measurement type.
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
   * @param {MeasurementType} type The measurement type (e.g. "length").
   * @returns {string[]} The units of the measurement type.
   */
  getUnits (type) {
    let units
    if (type === MeasurementType.LENGTH) {
      units = Object.values(LengthUnit)
    } else if (type === MeasurementType.TIME) {
      units = Object.values(TimeUnit)
    } else if (type === MeasurementType.WEIGHT) {
      units = Object.values(WeightUnit)
    } else if (type === MeasurementType.VOLUME) {
      units = Object.values(VolumeUnit)
    } else if (type === MeasurementType.SPEED) {
      units = Object.values(SpeedUnit)
    }
    return units
  }
}

export default new Helper()
