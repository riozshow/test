import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('test')).toBeNaN();
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('/')).toBeNaN();
    expect(convertPLNToUSD('')).toBeNaN();
  });
  it('should return NaN when there is no input', () => {
    expect(convertPLNToUSD()).toBeNaN();
    expect(convertPLNToUSD(null)).toBeNaN();
    expect(convertPLNToUSD(undefined)).toBeNaN();
  });
  it('should return Error when input is not type of string or number', () => {
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD(() => {})).toBe('Error');
    expect(convertPLNToUSD(new Error())).toBe('Error');
  });
});
