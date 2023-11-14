import { useState } from 'react'
import { useRoundUp } from './useRoundUp'

function getCurrencySignByCountryCode(countryCode: string) {
  return countryCode === 'JP' ? '¥' : '$'
}

const Payment = ({ amount, countryCode = 'US' }: { amount: number, countryCode?: string }) => {
  const [agreeOnDonate, setAgreeOnDonate] = useState(false)
  const { total, tip } = useRoundUp(amount, agreeOnDonate, countryCode)
  const currencySign = getCurrencySignByCountryCode(countryCode)

  const handleChange = () => {
    setAgreeOnDonate(agreeOnDonate => !agreeOnDonate)
  }

  return (
    <div>
      <h1>Payment</h1>
      <label htmlFor="donate-checkbox">
        <input type="checkbox" name="donate" id="donate-checkbox" onChange={handleChange} checked={agreeOnDonate} />
        I would like to donate {currencySign}{tip} to charity
      </label>
      {agreeOnDonate && <p>Thanks for your donation</p>}
      <div>
        <button>{currencySign}{total}</button>
      </div>
    </div>
  )
}

export default Payment
