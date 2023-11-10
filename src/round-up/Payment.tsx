import { useEffect, useState } from 'react'

const Payment = ({ amount }: { amount: number }) => {
  const [total, setTotal] = useState(amount)
  const [checked, setChecked] = useState(false)
  const [tip, setTip] = useState(0)

  const handleChange = () => {
    setChecked(checked => !checked)
  }

  useEffect(() => {
    setTotal(checked ? Math.floor(amount + 1) : amount)
    setTip(parseFloat((Math.floor(amount + 1) - amount).toPrecision(2)))
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