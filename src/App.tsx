import React from 'react';
import { OrderDetails } from './order/OrderDetails';
import Payment from './round-up/Payment';

function App() {
  return (
    <div className="app">
      <OrderDetails />
      <Payment amount={19.9} />
    </div>
  );
}

export default App;
