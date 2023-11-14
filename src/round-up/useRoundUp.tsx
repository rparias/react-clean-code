import { useEffect, useState } from 'react'

function calculateRoundUpForUS(amount: number) {
  return Math.floor(amount + 1)
}

function calculateTipForUS(amount: number) {
  return parseFloat((calculateRoundUpForUS(amount) - amount).toPrecision(2))
}

function calculateRoundUpForJP(amount: number) {
  return Math.floor(amount/100 + 1) * 100
}

function calculateTipForJP(amount: number) {
  return parseFloat((calculateRoundUpForJP(amount) - amount).toPrecision(2))
}

function calculateRoundUpForDK(amount: number) {
  return Math.floor(amount/10 + 1) * 10
}

function calculateTipForDK(amount: number) {
  return parseFloat((calculateRoundUpForDK(amount) - amount).toPrecision(2))
}

function calculateTip(countryCode: string, amount: number) {
  if (countryCode === 'JP') {
    return calculateTipForJP(amount)
  } else if (countryCode === 'DK') {
    return calculateTipForDK(amount)
  } else {
    return calculateTipForUS(amount)
  }
}

function calculateRoundUp(countryCode: string, amount: number) {
  if (countryCode === 'JP') {
    return calculateRoundUpForJP(amount)
  } else if (countryCode === 'DK') {
    return calculateRoundUpForDK(amount)
  } else {
    return calculateRoundUpForUS(amount)
  }
}

export const useRoundUp = (amount: number, agreeOnDonate: boolean, countryCode: string) => {
  const [total, setTotal] = useState(amount)
  const [tip, setTip] = useState(0)

  useEffect(() => {
    setTotal(agreeOnDonate ? calculateRoundUp(countryCode, amount) : amount)
    setTip(calculateTip(countryCode, amount))
  }, [agreeOnDonate, amount, countryCode])

  return { total, tip };
}
