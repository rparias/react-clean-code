import React, { useState } from 'react'

const Payment = ({ amount }: { amount: number }) => {
  const [checked, setChecked] = useState(false)
  const handleClick = () => {
    setChecked(checked => !checked)
  }

  return (
    <div>
      <h1>Payment</h1>
      <label htmlFor="donate-checkbox">
        <input type="checkbox" name="donate" id="donate-checkbox" onClick={handleClick} checked={checked} />
        I would like to donate $0.1 to charity
      </label>
      {checked && <p>Thanks for your donation</p>}
      <div>
        <button>${amount}</button>
      </div>
    </div>
  )
}

export default Payment