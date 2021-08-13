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

  handleUpdateOrder = (order) => {
    fetch(baseURL + 'api/orders/' + order._id, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        file: order.file,
        qty: order.qty,
        status: order.status
      }),
      headers: {
          'Content-Type' : 'application/json'
      }
    }).then(res => res.json())
    .then(resJson => {
        const copyOrders = [...this.state.orders]
        const findIndex = this.state.orders.findIndex(order => order._id === resJson._id)
        copyOrders[findIndex].firstName = resJson.firstName
        copyOrders[findIndex].lastName = resJson.lastName
        copyOrders[findIndex].email = resJson.email
        copyOrders[findIndex].file = resJson.file
        copyOrders[findIndex].qty = resJson.qty
        copyOrders[findIndex].status = resJson.status
        this.setState({orders: copyOrders})
    })
  }

  handleOrderToggle = (order) => {
    fetch(baseURL + '/api/orders/' + order._id, {
      method: 'PUT',
      body: JSON.stringify({
        status: order.status
      }),
      headers: {
          'Content-Type' : 'application/json'
      }
    }).then(res => res.json())
    .then(resJson => {
        const copyOrders = [...this.state.orders]
        const findIndex = this.state.orders.findIndex(order => order._id === order)
        copyOrders[findIndex].status = 'Started'
        this.setState({orders: copyOrders})
    })
  }

  deleteOrder = (id) => {
    fetch(baseURL + '/api/orders/' + id, {
      method: 'DELETE'
    }).then( response => {
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
          deleteOrder={this.deleteOrder}
          toggleOrder={this.handleOrderToggle}
        />
      </div>
    )
  }
}

export default App;
