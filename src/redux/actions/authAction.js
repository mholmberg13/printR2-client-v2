import axios from 'axios';
import ACTIONS from './index.js';

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async () => {
    const res = await axios.get('/user/info', {
        headers: {Authorixation: token}
    })
    return res
}

export const dispatchGetUser = async (res) => {
    return {
        type: ACTIONS.GET_USER,
        isAdmin: res.data.role === 1 ? true : false
    }
}