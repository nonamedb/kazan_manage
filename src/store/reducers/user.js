import { SET_VK_INFO, SET_TOKEN } from '../actionTypes';

const initialState = {
    vkInfo: {},
    token: '',
};

export default function(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case SET_VK_INFO: {
            newState.vkInfo = action.payload;
            return newState;
        };
        case SET_TOKEN: {
            newState.token = action.payload;
            return newState;
        };
        default: return state;
    }
}
  