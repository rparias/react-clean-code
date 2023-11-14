import { render, screen } from "@testing-library/react"
import Payment from "./Payment"
import userEvent from "@testing-library/user-event"

describe('Payment', () => {
  describe('USA Market', () => {
    it('Renders payment as title', () => {
      render(<Payment amount={0} />)
      expect(screen.getByText(/payment/i)).toBeInTheDocument()
    })
  
    it('Shows me the option of donate, case 1', () => {
      render(<Payment amount={19.9} />)
      expect(screen.getByText('I would like to donate $0.1 to charity')).toBeInTheDocument()
    })
  
    it('Shows me the option of donate, case 2', () => {
      render(<Payment amount={19.8} />)
      expect(screen.getByText('I would like to donate $0.2 to charity')).toBeInTheDocument()
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
  
    it('shows correct amount when user selected to donate', async () => {
      render(<Payment amount={19.9} />)
      const select = screen.getByText('I would like to donate $0.1 to charity')
      expect(select).toBeInTheDocument()
  
      userEvent.click(select)
      expect(await screen.findByText('$20')).toBeInTheDocument()
    })
  })

  describe('Japan Market', () => { 
    it('shows correct amount when user selected to donate', async () => {
      render(<Payment amount={3459} countryCode="JP" />)
      const select = screen.getByText('I would like to donate ¥41 to charity')
      expect(select).toBeInTheDocument()
  
      userEvent.click(select)
      expect(await screen.findByText('¥3500')).toBeInTheDocument()
    })
  })
  
  describe('Denmark Market', () => { 
    it('shows correct amount when user selected to donate', async () => {
      render(<Payment amount={321} countryCode="DK" />)
      const select = screen.getByText('I would like to donate kr.9 to charity')
      expect(select).toBeInTheDocument()
  
      userEvent.click(select)
      expect(await screen.findByText('kr.330')).toBeInTheDocument()
    })
  })
})