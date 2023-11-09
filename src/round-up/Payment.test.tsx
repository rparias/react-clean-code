import { render, screen } from "@testing-library/react"
import Payment from "./Payment"
import userEvent from "@testing-library/user-event"

describe('Payment', () => {
  it('Renders payment as title', () => {
    render(<Payment amount={0} />)
    expect(screen.getByText(/payment/i)).toBeInTheDocument()
  })

  it('Shows me the option of donate', () => {
    render(<Payment amount={19.9} />)
    expect(screen.getByText('I would like to donate $0.1 to charity')).toBeInTheDocument()
  })

  it('Shows me the total amount', () => {
    render(<Payment amount={19.9} />)
    expect(screen.getByText('$19.9')).toBeInTheDocument()
  })

  it('Shows thanks when user selected donation', () => {
    render(<Payment amount={19.9} />)
    const select = screen.getByText('I would like to donate $0.1 to charity')
    expect(select).toBeInTheDocument()

    userEvent.click(select)
    expect(screen.getByText(/thanks for your donation/i)).toBeInTheDocument()
  })
})