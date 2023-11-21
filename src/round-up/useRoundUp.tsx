import { useEffect, useState } from 'react'
import { CountryCode } from './types'

const roundUpToNearestN = (exp: number) => (amount: number) => {
  const power = Math.pow(10, exp - 1)
  return Math.floor(amount/power + 1) * power
}

// closure functions
const roundUpToNearestInteger = roundUpToNearestN(1)
const roundUpToNearestTen = roundUpToNearestN(2)
const roundUpToNearestHundred = roundUpToNearestN(3)

function formatNumber(number: number) {
  return parseFloat(number.toPrecision(2))
}

const calculateTipFor = (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
  return formatNumber(calculateRoundUpFor(amount) - amount);
}

const algorithmMap = {
  US: roundUpToNearestInteger,
  DK: roundUpToNearestTen,
  JP: roundUpToNearestHundred
}

function getCalculateRoundUpFunc(countryCode: CountryCode) {
  return algorithmMap[countryCode]
}

function getCalculateTipFunc(countryCode: CountryCode) {
  return calculateTipFor(algorithmMap[countryCode])
}

export const useRoundUp = (amount: number, agreeOnDonate: boolean, countryCode: CountryCode) => {
  const [total, setTotal] = useState(amount)
  const [tip, setTip] = useState(0)

  useEffect(() => {
    const calculateRoundUp = getCalculateRoundUpFunc(countryCode)
    const calculateTip = getCalculateTipFunc(countryCode)

    setTotal(agreeOnDonate ? calculateRoundUp(amount) : amount)
    setTip(calculateTip(amount))
  }, [agreeOnDonate, amount, countryCode])

  return { total, tip };
}
