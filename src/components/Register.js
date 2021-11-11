import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {showErrMsg, showSuccessMsg} from '../components/notifications/notification.js';
import {isEmpty, isEmail, isLength, isMatch} from './validation/validation'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {

    const [user, setUser] = useState(initialState)

    const {firstName, lastName, email, password, cf_password, err, success} = user

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if(isEmpty(firstName) || isEmpty(password))
            return setUser({...user, err: 'Please fill in all fields.', success: ''})

        if(isEmpty(lastName))
            return setUser({...user, err: 'Please fill in all fields.', success: ''})

        if(!isEmail(email))
            return setUser({...user, err: 'Invalid Email.', success: ''})

        if(isLength(password))
            return setUser({...user, err: 'Password must be at least 6 characters.', success: ''})

        if(!isMatch(password, cf_password))
            return setUser({...user, err: 'Passwords did not match.', success: ''})
        try {
            const res = await axios.post('/user/register', {
                firstName, lastName, email, password
            })

            setUser({...user, err: '', success: res.data.msg})

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg + "blue", success: ''})
        }
    }
        return (
            <div className="register-container">
                <h2>Register</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" placeholder="First Name" id="firstName" onChange={handleChange} value={firstName} name="firstName"/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" placeholder="Last Name" id="lastName" onChange={handleChange} value={lastName} name="lastName"/>
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" placeholder="Enter Email" id="email" onChange={handleChange} value={email} name="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" placeholder="Enter Password" id="password" onChange={handleChange} value={password} name="password"/>
                    </div>
                    <div>
                        <label htmlFor="cf_password">Confirm Password</label>
                        <input type="text" placeholder="Re-enter Password" id="cf_password" onChange={handleChange} value={cf_password} name="cf_password"/>
                    </div>
                    <div className="buttons">
                        <button type="submit">Register</button>
                    </div>
                </form>
                <p>Already have an account?<Link to="/login">Log In</Link></p>
            </div>
        )
}

export default Register;