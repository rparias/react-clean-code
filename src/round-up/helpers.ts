import { roundUpToNearestInteger, roundUpToNearestTen, roundUpToNearestHundred } from './roundUpLogic';
import { CountryCode } from './types';

const currencyMap = {
  US: '$',
  DK: 'kr.',
  JP: '¥',
};

const algorithmMap = {
  US: roundUpToNearestInteger,
  DK: roundUpToNearestTen,
  JP: roundUpToNearestHundred
}

export function getCurrencySignByCountryCode(countryCode: CountryCode) {
  return currencyMap[countryCode];
}

function formatNumber(number: number) {
  return parseFloat(number.toPrecision(2))
}

const calculateTipFor = (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
  return formatNumber(calculateRoundUpFor(amount) - amount)
}

export function getCalculateRoundUpFunc(countryCode: CountryCode) {
  return algorithmMap[countryCode]
}

export function getCalculateTipFunc(countryCode: CountryCode) {
  return calculateTipFor(algorithmMap[countryCode])
}
