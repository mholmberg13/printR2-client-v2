import React from 'react';

class OrderPage extends React.Component {

    render() {
        return(
            <div className='order-page-container'>
                <ul>
                    {this.props.parentState.map(order => {
                        return (<li key={order._id}>First Name: {order.firstName}</li>)
                    })}
                </ul>
            </div>
        )
    }
}
  
  export default OrderPage;