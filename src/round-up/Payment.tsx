import { useState } from 'react'
import { useRoundUp } from './useRoundUp'
import { getCurrencySignByCountryCode } from './helpers'
import { CountryCode } from "./types"

type PaymentProps = {
  amount: number;
  countryCode?: CountryCode;
};

const Payment = ({ amount, countryCode = 'US' }: PaymentProps) => {
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
