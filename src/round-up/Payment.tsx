import { useEffect, useState } from 'react'

function calculateRoundUp(amount: number) {
  return Math.floor(amount + 1)
}

function calculateTip(amount: number) {
  return parseFloat((calculateRoundUp(amount) - amount).toPrecision(2))
}

const Payment = ({ amount }: { amount: number }) => {
  const [total, setTotal] = useState(amount)
  const [checked, setChecked] = useState(false)
  const [tip, setTip] = useState(0)

  const handleChange = () => {
    setChecked(checked => !checked)
  }

  useEffect(() => {
    setTotal(checked ? calculateRoundUp(amount) : amount)
    setTip(calculateTip(amount))
  }, [checked, amount])

  return (
    <div>
      <h1>Payment</h1>
      <label htmlFor="donate-checkbox">
        <input type="checkbox" name="donate" id="donate-checkbox" onChange={handleChange} checked={checked} />
        I would like to donate ${tip} to charity
      </label>
      {checked && <p>Thanks for your donation</p>}
      <div>
        <button>${total}</button>
      </div>
    </div>
  )
}

export default Payment
