import harmonics from '../index'
import mockHarmonicConstituents from '../__mocks__/constituents'
import prediction from '../prediction'

const startDate = new Date()
startDate.setFullYear(2019)
startDate.setMonth(8)
startDate.setDate(1)
startDate.setHours(0)
startDate.setMinutes(0)
startDate.setSeconds(0)
startDate.setMilliseconds(0)

const endDate = new Date()
endDate.setFullYear(2019)
endDate.setMonth(8)
endDate.setDate(1)
endDate.setHours(6)
endDate.setMinutes(0)
endDate.setSeconds(0)
endDate.setMilliseconds(0)

const getPrediction = () => {
  const harmonic = new harmonics(mockHarmonicConstituents)
  harmonic.setTimeSpan(startDate, endDate)
  return harmonic.getPrediction()
}

describe('harmonic prediction', () => {
  test('it creates a prediction', () => {
    const testPrediction = getPrediction()
    expect(testPrediction).toBeInstanceOf(prediction)
  })

  test('it prepares prediction values', () => {
    const testPrediction = getPrediction()
    const { baseValue, baseSpeed, u, f } = testPrediction.prepare()
    expect(baseValue.M2).toBeCloseTo(5.65816609, 4)
    expect(baseSpeed.M2).toBeCloseTo(0.50586805, 4)
    expect(u[0].M2).toBeCloseTo(6.2471702, 4)
    // @to-do this might be wrong
    expect(f[0].M2).toBeCloseTo(1.0096589, 4)
  })

  test('it prepares prediction values by degrees', () => {
    const testPrediction = getPrediction()
    const { baseValue, baseSpeed, u, f } = testPrediction.prepare(false)
    expect(baseValue.M2).toBeCloseTo(324.189036, 4)
    expect(baseSpeed.M2).toBeCloseTo(28.9841042, 4)
    expect(u[0].M2).toBeCloseTo(357.939049, 4)
    expect(f[0].M2).toBeCloseTo(1.0096589, 4)
  })

  test('it sets a correct phase type', () => {
    const testPrediction = getPrediction()
    expect(testPrediction.phaseType).toBe('GMT')
    testPrediction.setPhaseType('local')
    expect(testPrediction.phaseType).toBe('local')
    let errorMessage = false
    try {
      testPrediction.setPhaseType('wrong')
    } catch (error) {
      errorMessage = error
    }
    expect(errorMessage).toBe('phase type must be local or GMT')
  })

  test('it defines phases in constituents by radians', () => {
    const testPrediction = getPrediction()
    testPrediction.setConstituentPhases()
    let Q1 = false
    testPrediction.constituents.forEach(constituent => {
      if (constituent.name === 'Q1') {
        Q1 = constituent
      }
    })
    expect(Q1).not.toBeFalsy()
    expect(Q1._phase).toBeCloseTo(3.3999013828849542, 5)
  })

  test('it creates a timeline prediction', () => {
    const testPrediction = getPrediction()
    const results = testPrediction.getTimelinePrediction()
    expect(results[0].level).toBeCloseTo(-1.40468181, 3)
    expect(results.pop().level).toBeCloseTo(2.60312343, 3)
  })
})
