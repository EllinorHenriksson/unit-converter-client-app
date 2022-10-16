class Helper {
  validateMeasurementType (type) {
    if (type !== 'length' && type !== 'time' && type !== 'weight' && type !== 'volume' && type !== 'speed') {
      throw new Error('The attribute must be set to a string representing the available measurement types: length, time, weight, volume or speed. ')
    }
  }
}

export default new Helper()
