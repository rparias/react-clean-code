import { useEffect, useState } from 'react'
import { CountryCode } from './types'

function calculateRoundUpForUS(amount: number) {
  return Math.floor(amount + 1)
}

function calculateRoundUpForJP(amount: number) {
  return Math.floor(amount/100 + 1) * 100
}

function calculateRoundUpForDK(amount: number) {
  return Math.floor(amount/10 + 1) * 10
}

function formatNumber(number: number) {
  return parseFloat(number.toPrecision(2))
}

const calculateTipFor = (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
  return formatNumber(calculateRoundUpFor(amount) - amount);
}

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
    return calculateRoundUpForJP(amount)
  } else if (countryCode === 'DK') {
    return calculateRoundUpForDK(amount)
  } else {
    return calculateRoundUpForUS(amount)
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
