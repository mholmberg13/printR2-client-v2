import './App.css';
import React from 'react';
import NewOrder from './components/NewOrder.js';
import OrderPage from './components/OrderPage.js';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:5000'
} else {
    baseURL = 'heroku URL goes here'
};

console.log('Current base URL:', baseURL)

class App extends React.Component {
  state = {
    orders: []
  }
  componentDidMount() {
      this.getOrders()
  };
  getOrders = () => {
      fetch(baseURL + '/api/orders')
          .then(data => {
              return data.json()},
              err => console.log(err))
              .then(parsedData => this.setState({orders: parsedData}),
              err => console.log(err))
              console.log(this.state.orders)
  } 

  handleAddOrder = (order) => {
    const copyOrders = [...this.state.orders]
    copyOrders.unshift(order)
    this.setState({
      orders: copyOrders,
      name: ''
    })
  }

  render() {
    return (
      <div className='App'>
        <NewOrder
          baseURL={baseURL}
          handleAddOrder={this.handleAddOrder}
        />
        <ul>
          {this.state.orders.map(order => {
            return (<li key={order._id}>First Name: {order.firstName}</li>)
          })}
          
        </ul>
        {/* <OrderPage
          baseURL={baseURL}
          getOrders={this.getOrders}
          parentState={this.state.orders}
        /> */}
      </div>
    )
  }
}

export default App;
