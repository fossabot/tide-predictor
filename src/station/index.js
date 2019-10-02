import harmonics from '../harmonics'

class station {
  constructor(stationInfo) {
    this.harmonics = []
    this.isSubordinate = false

    if (stationInfo) {
      this.setHarmonicConstituents(stationInfo.HarmonicConstituents)
      this.setIsSubordinate(
        typeof stationInfo.isSubordinate !== 'undefined'
          ? stationInfo.isSubordinate
          : false
      )
    }
  }

  setIsSubordinate(isSubordinate) {
    this.isSubordinate = isSubordinate
  }

  setHarmonicConstituents(constituents) {
    this.harmonics = new harmonics(constituents)
  }
}

export default station
