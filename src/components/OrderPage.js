import React from 'react';

class OrderPage extends React.Component {

    state = {
        status: ''
    }

    render() {
        return(
            <div className='order-page-container'>
                    {this.props.parentState.map(order => {
                        return (<div key={order._id}>First Name: {order.firstName} File: {order.file}- Status: {order.status}
                        <button onClick={()=>this.props.deleteOrder(order._id)}>Delete</button>
                        <button onClick={()=>this.props.toggleOrder(order)}>Start</button>
                        <button onClick={()=>this.props.toggleOrder(order)}>Complete</button>
                        </div>)
                    })}
            </div>
        )
    }
}
  
  export default OrderPage;