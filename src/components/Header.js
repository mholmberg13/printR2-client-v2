import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
    render () {
        return (
            <div className='header-contianer'>
                <h2>Print-R2</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="login">Log-In</Link></li>
                </ul>
            </div>
        )
    }
}

export default Header;