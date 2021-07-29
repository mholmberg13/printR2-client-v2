import React from 'react';

class NewOrder extends React.Component {
    state = {
        name: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch(this.props.baseURL + '/api/orders', {
            method: 'POST',
            body: JSON.stringify({name: this.state.name}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then (res => res.json())
          .then(resJson => {
              this.props.handleAddOrder(resJson)
              this.setState({
                  name: ''
              })
          }).catch (error => console.log({'Error': error}))  
    }

    render() {
        return (
            <div className='new-order-container'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name"></label>
                    <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} placeholder="add a holiday"/>
                    <input type="submit" value="Add a Reason to Celebrate"/>
                </form>`
            </div>
        )
    }
}

export default NewOrder;