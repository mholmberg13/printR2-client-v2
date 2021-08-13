import React from 'react';

class OrderPage extends React.Component {

    state = {
        status: ''
    }

    render() {
        return(
            <div className='order-page-container'>
                <ul>
                    {this.props.parentState.map(order => {
                        return (<li key={order._id}>First Name: {order.firstName} - Status: {order.status}
                        <button onClick={()=>this.props.deleteOrder(order._id)}>Delete</button>
                        <button onClick={()=>this.props.toggleOrder(order)}>Start</button>
                        <button>Complete</button>
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
}
  
  export default OrderPage;