import { SET_VK_INFO, SET_TOKEN, SET_MY_EVENTS, OPEN_EVENT, CREATE_IVENT, GET_VOL_EVENTS } from './actionTypes';
import store from './store'; 
import http from '../http';
import { async } from 'q';

export const setVkInfo = async (info) => {
    return store.dispatch({
        type: SET_VK_INFO,
        payload: info,
    });
}

export const setToken = async (token) => {
    return store.dispatch({
        type: SET_TOKEN,
        payload: token,
    })
}

export const setMyEvents = async (events) => {
    return store.dispatch({
        type: SET_MY_EVENTS,
        payload: events.filter(item => item.type === 'event'),
    });
}

export const openEvent = async (id) => {
    return store.dispatch({
        type: OPEN_EVENT,
        payload: id,
    });
};

export const createEvent = async (event) => {
    http.post('/event/add', event);
}

export const getVolEvents = async (id) => {
    const data = await http.get(`organizer/${id}`);
    return store.dispatch({
        type: GET_VOL_EVENTS,
        payload: data.data.events,
    })
}
