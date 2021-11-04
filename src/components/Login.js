import React from "react";
import { Link } from "react-router-dom";

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



    render() {
        return (
            <div className="login-container">
                <h2>Login</h2>

                <form>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" placeholder="Enter Email" id="email" value={this.user.email} name="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" placeholder="Enter Password" id="password" value={this.user.password} name="password"/>
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