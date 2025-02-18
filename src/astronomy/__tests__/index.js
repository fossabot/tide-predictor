import astro, {
  polynomial,
  derivativePolynomial,
  JD,
  T,
  _I,
  _xi,
  _nu,
  _nup,
  _nupp
} from '../index'

const sampleTime = new Date()
sampleTime.setFullYear(2019)
sampleTime.setMonth(9)
sampleTime.setDate(4)
sampleTime.setHours(10)
sampleTime.setMinutes(15)
sampleTime.setSeconds(40)
sampleTime.setMilliseconds(10)

describe('astronomy', () => {
  test('complete astronomic calculation', () => {
    const result = astro(sampleTime)
    expect(result.s.value).toBeCloseTo(258.23871057233191, 4)
    expect(result.s.speed).toBeCloseTo(0.54901651929993922, 4)

    expect(result.pp.value).toBeCloseTo(283.27697979858613, 4)
    expect(result.pp.speed).toBeCloseTo(1.9612154426341654e-6, 4)

    expect(result.h.value).toBeCloseTo(192.82639897760328, 4)
    expect(result.h.speed).toBeCloseTo(0.041068640143510367, 4)

    expect(result.xi.value).toBeCloseTo(11.989946298635664, 4)
    expect(result.xi.speed).toBeNull()

    expect(result.I.value).toBeCloseTo(22.811296275568843, 4)
    expect(result.I.speed).toBeNull()

    expect(result.P.value).toBeCloseTo(155.24265065565865, 4)
    expect(result.P.speed).toBeNull()

    expect(result.nupp.value).toBeCloseTo(8.8162480626605451, 4)
    expect(result.nupp.speed).toBeNull()

    expect(result.nu.value).toBeCloseTo(13.028571777192044, 4)
    expect(result.nu.speed).toBeNull()

    expect(result['T+h-s'].value).toBeCloseTo(268.50435506200392, 4)
    expect(result['T+h-s'].speed).toBeCloseTo(14.492052120843571, 4)

    expect(result.omega.value).toBeCloseTo(23.436722306067253, 4)
    expect(result.omega.speed).toBeCloseTo(-1.4832917321024327e-8, 4)
  })

  test('evaluates a polynomial', () => {
    expect(polynomial([1, 2, 3], 3)).toBe(34)
  })

  test('evaluates derivative polynomials', () => {
    expect(derivativePolynomial([1, 2, 3], 3)).toBe(20)
  })

  test('evaluates Meeus formula 7.1 (JD) correctly', () => {
    sampleTime.setMonth(9)
    expect(JD(sampleTime)).toBeCloseTo(2458760.92755, 2)
    //Months of less than 2 go back a year
    sampleTime.setMonth(0)
    expect(JD(sampleTime)).toBeCloseTo(2458487.92755, 2)
  })

  test('evaluates Meeus formula 11.1 (T) correctly', () => {
    sampleTime.setMonth(9)
    expect(T(sampleTime)).toBeCloseTo(0.19756132, 2)
  })

  test('evaluates value for _I correctly', () => {
    expect(_I(4, 10, 5)).toBeCloseTo(14.9918364991, 4)
  })

  test('evaluates value for _xi correctly', () => {
    expect(_xi(4, 3, 10)).toBeCloseTo(0.911946348144, 4)
  })

  test('evaluates value for _nu correctly', () => {
    expect(_nu(10, 4, 5)).toBeCloseTo(4.45767377718, 4)
  })

  test('evaluates value for _nup correctly', () => {
    expect(_nup(10, 4, 5)).toBeCloseTo(2.13580480226, 4)
  })

  test('evaluates value for _nupp correctly', () => {
    expect(_nupp(10, 4, 5)).toBeCloseTo(1.1146589591, 4)
  })
})
