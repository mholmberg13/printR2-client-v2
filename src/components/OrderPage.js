import React from 'react';

class OrderPage extends React.Component {

    render() {
        return(
            <div className='order-page-container'>
                <table>
                    <tbody>
                        { this.props.parentState.map(order => {
                            return (
                                <tr key={order._id}>
                                    <td> {order.name }</td>
                                </tr>
                            )
                          })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
  
  export default OrderPage;