import { act } from "react-dom/test-utils";
import ACTIONS from "../actions";

const token = ''

const tokenReducer = (state = token, action) => {
    switch(action.type){
        case ACTIONS.GET_TOKEN:
            return action.payload
        default:
            return state
    }
}

export default tokenReducer