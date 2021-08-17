import React from 'react';

class NewOrder extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        file: '',
        qty: 0,
        status: 'Pending'
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.props.baseURL + '/api/orders')
        fetch(this.props.baseURL + '/api/orders', {
            method: 'POST',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                file: this.state.file,
                qty: this.state.qty,
                status: this.state.status
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then (res => res.json())
          .then(resJson => {
              this.props.handleAddOrder(resJson)
              this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    file: '',
                    qty: 0,
                    status: ''
              })
          }).catch (error => console.log({'Error': error}))  
    }

    handleSubmitTwo = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('firstName', this.state.firstName)
        formData.append('lastName', this.state.lastName)
        formData.append('email', this.state.email)
        formData.append('file', this.state.file)
        formData.append('qty', this.state.qty)
        formData.append('status', this.state.status)

        fetch(this.props.baseURL + '/api/orders', {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
        .then(resJson => {
            this.props.handleAddOrder(resJson)
              this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    file: '',
                    qty: 0,
                    status: ''
              })
        }).catch (error => console.log({'Error': error}))

    }

    render() {
        return (
            <div className='new-order-container'>
                <form onSubmit={this.handleSubmitTwo} encType='multipart/form-data'>
                    <label htmlFor="firstName"></label>
                    <input type="text" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder="Fist Name"/>
                    <label htmlFor="lastName"></label>
                    <input type="text" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name"/>
                    <label htmlFor="email"></label>
                    <input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email"/>
                    <label htmlFor="file"></label>
                    <input type="file" id="file" name="file" onChange={this.handleChange} value={this.state.file} placeholder="File"/>
                    <label htmlFor="qty"></label>
                    <input type="text" id="qty" name="qty" onChange={this.handleChange} value={this.state.qty} placeholder="0"/>
                    <input type="submit" value="Submit Order"/>
                </form>`
            </div>
        )
    }
}

export default NewOrder;