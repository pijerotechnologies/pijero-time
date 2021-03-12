const { formatConfiguredTime } = require('./../utils/time')

describe('formatConfiguredTime', () => {
  it('passing 01:00 hour and 00:15 minutes should format it to 01:15', () => {
    expect(formatConfiguredTime('01:00', '00:15')).toBe('01:15')
  })
  it('passing 01:00 hour and null minutes should format it to 01:00', () => {
    expect(formatConfiguredTime('01:00', null)).toBe('01:00')
  })
})
