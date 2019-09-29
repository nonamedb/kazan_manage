import { SET_MY_EVENTS, OPEN_EVENT, GET_VOL_EVENTS } from '../actionTypes';

const initialState = {
    events: [],
    currentOpen: '',
    volEvents: [],
};

export default function(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case SET_MY_EVENTS: {
            newState.events = action.payload;
            return newState;
        };
        case OPEN_EVENT: {
            newState.currentOpen = action.payload;
            return newState;
        };
        case GET_VOL_EVENTS: {
            newState.volEvents = action.payload;
            return newState;
        };
        default: return state;
    }
}
  