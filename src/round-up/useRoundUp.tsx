import { useEffect, useState } from 'react'

function calculateRoundUp(amount: number) {
  return Math.floor(amount + 1)
}

function calculateTip(amount: number) {
  return parseFloat((calculateRoundUp(amount) - amount).toPrecision(2))
}

export const useRoundUp = (amount: number, agreeOnDonate: boolean) => {
  const [total, setTotal] = useState(amount)
  const [tip, setTip] = useState(0)

  useEffect(() => {
    setTotal(agreeOnDonate ? calculateRoundUp(amount) : amount)
    setTip(calculateTip(amount))
  }, [agreeOnDonate, amount])

  return { total, tip };
}