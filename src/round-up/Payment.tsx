import { useState } from 'react'
import { useRoundUp } from './useRoundUp'

const Payment = ({ amount }: { amount: number }) => {
  const [agreeOnDonate, setAgreeOnDonate] = useState(false)
  const { total, tip } = useRoundUp(amount, agreeOnDonate)

  const handleChange = () => {
    setAgreeOnDonate(agreeOnDonate => !agreeOnDonate)
  }

  return (
    <div>
      <h1>Payment</h1>
      <label htmlFor="donate-checkbox">
        <input type="checkbox" name="donate" id="donate-checkbox" onChange={handleChange} checked={agreeOnDonate} />
        I would like to donate ${tip} to charity
      </label>
      {agreeOnDonate && <p>Thanks for your donation</p>}
      <div>
        <button>${total}</button>
      </div>
    </div>
  )
}

export default Payment
