import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { isLength } from './validation/validation';

function Header() {

    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth

    const userLink = () => {
        return <li>
            <Link to='/'>
                {user.firstName}
            </Link>
        </li>
    }

    return (
        <div className='header-contianer'>
            <h2>Print-R2</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                {
                    isLogged
                    ? userLink()
                    : <li><Link to="/login">Log-In</Link></li>
                }
                
            </ul>
        </div>
    )
}

export default Header;