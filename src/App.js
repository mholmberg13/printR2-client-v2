import './App.css';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Body from './components/Body';
import Header from './components/Header'
import axios from 'axios';
import { dispatchGetUser, dispatchLogin, fetchUser } from './redux/actions/authAction';


let baseURL = '';

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:5000'
} else {
    baseURL = 'heroku URL goes here'
};

console.log('Current base URL:', baseURL)

function App() {
  // state = {
  //   orders: []
  // }
  // componentDidMount() {
  //     this.getOrders()
  // };
  // getOrders = () => {
  //     fetch(baseURL + '/api/orders')
  //         .then(data => {
  //             return data.json()},
  //             err => console.log(err))
  //             .then(parsedData => this.setState({orders: parsedData}),
  //             err => console.log(err))
  //             console.log(this.state.orders)
  // } 

  // handleAddOrder = (order) => {
  //   const copyOrders = [...this.state.orders]
  //   copyOrders.unshift(order)
  //   this.setState({
  //     orders: copyOrders
  //   })
  // }

  // handleUpdateOrder = (order) => {
  //   fetch(baseURL + 'api/orders/' + order._id, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       firstName: order.firstName,
  //       lastName: order.lastName,
  //       email: order.email,
  //       file: order.file,
  //       qty: order.qty,
  //       status: order.status
  //     }),
  //     headers: {
  //         'Content-Type' : 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .then(resJson => {
  //       const copyOrders = [...this.state.orders]
  //       const findIndex = this.state.orders.findIndex(order => order._id === resJson._id)
  //       copyOrders[findIndex].firstName = resJson.firstName
  //       copyOrders[findIndex].lastName = resJson.lastName
  //       copyOrders[findIndex].email = resJson.email
  //       copyOrders[findIndex].file = resJson.file
  //       copyOrders[findIndex].qty = resJson.qty
  //       copyOrders[findIndex].status = resJson.status
  //       this.setState({orders: copyOrders})
  //   })
  // }

  // handleOrderToggle = (order) => {
  //   let stat = ''
  //   order.status === 'Pending' ? stat = 'Started' : stat = 'Complete'
  //   fetch(baseURL + '/api/orders/' + order._id, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       status: stat
  //     }),
  //     headers: {
  //         'Content-Type' : 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .then(resJson => {
  //       const copyOrders = [...this.state.orders]
  //       const findIndex = this.state.orders.findIndex(order => order._id === resJson._id)
  //       copyOrders[findIndex].status = stat
  //       this.setState({orders: copyOrders})
  //   })
  // }

  // deleteOrder = (id) => {
  //   fetch(baseURL + '/api/orders/' + id, {
  //     method: 'DELETE'
  //   }).then( response => {
  //     const findIndex = this.state.orders.findIndex(order => order._id === id)
  //     const copyOrders = [...this.state.orders]
  //     copyOrders.splice(findIndex, 1)
  //     this.setState({orders: copyOrders})
  //   })
  // }

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())
        
        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])

    return (
      <Router>
        <div className="app-container">
          <Header/>
          <Body/>
        </div>
      </Router>
    )
  }

export default App;
