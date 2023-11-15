import { CountryCode } from './types';

const currencyMap = {
  JP: '¥',
  DK: 'kr.',
  US: '$'
};

export function getCurrencySignByCountryCode(countryCode: CountryCode) {
  return currencyMap[countryCode];
}
