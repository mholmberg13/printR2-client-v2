import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {showErrMsg, showSuccessMsg} from '../components/notifications/notification.js'
import {dispatchLogin} from '../redux/actions/authAction';
import {useDispatch} from 'react-redux';

const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {

    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {email, password, err, success} = user

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            navigate('/')

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
        return (
            <div className="login-container">
                <h2>Login</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" placeholder="Enter Email" id="email" onChange={handleChange} value={email} name="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" placeholder="Enter Password" id="password" onChange={handleChange} value={password} name="password"/>
                    </div>
                    <div className="buttons">
                        <button type="submit">Login</button>
                        <Link to="/forgot_password">Forgot Password?</Link>
                    </div>
                </form>
                <p>New User?<Link to="/register">Register</Link></p>
            </div>
        )
}

export default Login;