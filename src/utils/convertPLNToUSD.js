export const convertPLNToUSD = (PLN) => {
  if (typeof PLN === 'string' || !PLN) return NaN;

  if (typeof PLN !== 'string' && typeof PLN !== 'number') {
    return 'Error';
  }

  const PLNtoUSD = PLN / 3.5;

  if (PLNtoUSD < 0) {
    return '$0.00';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};
