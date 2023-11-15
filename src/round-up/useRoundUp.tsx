import { useEffect, useState } from 'react'
import { CountryCode } from './types'

const roundUpToNearestN = (exp: number) => (amount: number) => {
  const power = Math.pow(10, exp - 1)
  return Math.floor(amount/power + 1) * power
}

function formatNumber(number: number) {
  return parseFloat(number.toPrecision(2))
}

const calculateTipFor = (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
  return formatNumber(calculateRoundUpFor(amount) - amount);
}

// closure functions
const calculateRoundUpForUS = roundUpToNearestN(1)
const calculateRoundUpForDK = roundUpToNearestN(2)
const calculateRoundUpForJP = roundUpToNearestN(3)

// closure functions
const calculateTipForUS = calculateTipFor(calculateRoundUpForUS)
const calculateTipForJP = calculateTipFor(calculateRoundUpForJP)
const calculateTipForDK = calculateTipFor(calculateRoundUpForDK)

function calculateTip(countryCode: CountryCode, amount: number) {
  if (countryCode === 'JP') {
    return calculateTipForJP(amount) // calling closure with parameter
  } else if (countryCode === 'DK') {
    return calculateTipForDK(amount) // calling closure with parameter
  } else {
    return calculateTipForUS(amount) // calling closure with parameter
  }
}

function calculateRoundUp(countryCode: CountryCode, amount: number) {
  if (countryCode === 'JP') {
    return calculateRoundUpForJP(amount) // calling closure with parameter
  } else if (countryCode === 'DK') {
    return calculateRoundUpForDK(amount) // calling closure with parameter
  } else {
    return calculateRoundUpForUS(amount) // calling closure with parameter
  }
}

export const useRoundUp = (amount: number, agreeOnDonate: boolean, countryCode: CountryCode) => {
  const [total, setTotal] = useState(amount)
  const [tip, setTip] = useState(0)

  useEffect(() => {
    setTotal(agreeOnDonate ? calculateRoundUp(countryCode, amount) : amount)
    setTip(calculateTip(countryCode, amount))
  }, [agreeOnDonate, amount, countryCode])

  return { total, tip };
}
