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

    data = ''

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value})
    }

    processFile = (e) => {
        this.setState({ [e.target.id]: e.target.value})			
        var file = e.target.files[0]
        var formdata = new FormData();

        formdata.append('file', file);
        formdata.append('cloud_name', 'matt-holmberg');
        formdata.append('upload_preset', 'yruxucxg');

        this.data = formdata
    }

    sendFile = () => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "https://api.cloudinary.com/v1_1/matt-holmberg/upload",true);
        
        xhr.onload = function () {
        // do something to response
            console.log(this.responseText);

        };
        xhr.send(this.data);

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('firstName', this.state.firstName)
        formData.append('lastName', this.state.lastName)
        formData.append('email', this.state.email)
        formData.append('file', this.state.file)
        formData.append('qty', this.state.qty)
        formData.append('status', this.state.status)
        console.log()

        fetch(this.props.baseURL + '/api/orders', {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
        .then(resJson => {
            this.props.handleAddOrder(resJson)
            this.props.getOrders()
              this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    file: '',
                    qty: 0,
                    status: 'Pending'
              })
        }).then(this.uploadFile).catch (error => console.log({'Error': error}))
        this.sendFile()
        this.props.getOrders()
    }

    render() {
        return (
            <div className='new-order-container'>
                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                    <label htmlFor="firstName"></label>
                    <input type="text" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder="Fist Name"/>
                    <label htmlFor="lastName"></label>
                    <input type="text" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name"/>
                    <label htmlFor="email"></label>
                    <input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email"/>
                    <label htmlFor="file"></label>
                    <input type="file" id="file" name="file" onChange={this.processFile} value={this.state.file} placeholder="File"/>
                    <label htmlFor="qty"></label>
                    <input type="text" id="qty" name="qty" onChange={this.handleChange} value={this.state.qty} placeholder="0"/>
                    <input type="submit" value="Submit Order"/>
                </form>`
            </div>
        )
    }
}

export default NewOrder;