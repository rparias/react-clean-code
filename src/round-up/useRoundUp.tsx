import { useEffect, useState } from 'react'
import { CountryCode } from './types'
import { getCalculateRoundUpFunc, getCalculateTipFunc } from './helpers'

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
