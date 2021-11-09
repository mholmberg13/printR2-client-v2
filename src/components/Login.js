import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        err: '',
        success: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value})
    }

    user = this.state
    setUser = this.state

    email = this.user.email
    password = this.user.password
    err = this.user.err
    success = this.user.success

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {})
            console.log(res)
        } catch (err) {
            err.response.data.msg && this.setUser({...this.user, err: err.response.data.msg, success: ''})
        }
    }

    render() {
        return (
            <div className="login-container">
                <h2>Login</h2>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" placeholder="Enter Email" id="email" onChange={this.handleChange} value={this.state.email} name="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" placeholder="Enter Password" id="password" onChange={this.handleChange} value={this.state.password} name="password"/>
                    </div>
                    <div className="buttons">
                        <button type="submit">Login</button>
                        <Link to="/forgot_password">Forgot Password?</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;