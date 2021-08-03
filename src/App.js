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

  deleteOrder = (id) => {
    fetch(baseURL + '/api/orders/' + id, {
      method: 'DELETE'
    }).then( res => {
      const findIndex = this.state.orders.findIndex(order => order._id === id)
      const copyOrders = [...this.state.orders]
      copyOrders.splice(findIndex, 1)
      this.setState({orders: copyOrders})
    })
  }

  render() {
    return (
      <div className='App'>
        <NewOrder
          baseURL={baseURL}
          handleAddOrder={this.handleAddOrder}
        />
        <OrderPage
          baseURL={baseURL}
          getOrders={this.getOrders}
          parentState={this.state.orders}
        />
      </div>
    )
  }
}

export default App;
