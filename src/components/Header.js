import { defaultMaxListeners } from 'node:events';
import React from 'react';


class Header extends React.Component {
    render () {
        return (
            <div className='header-contianer'>
                <h2>Print-R2</h2>
                <ul className='nav'>
                    <li>Home</li>
                    <li>Orders</li>
                    <li>Settings</li>
                </ul>
            </div>
        )
    }
}

export default Header;