import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_ONLINECOMOLAINS,
    // FETCH_DEPARTMENT_ID,
    // FETCH_DEPARTMENT
} from './types';

import api from '../apis';
import { encryptId } from '../utils'

export const fetchOnlinecomplains = () => async dispatch => {
    try {
        const res = await  api.get(`publics`)
        if (res.data) {
            dispatch({ type: FETCH_ONLINECOMPLAINS, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const fetchOnlinecomplain = () => async dispatch => {
    try {
        const res = await  api.get(`publics`)
        if (res.data) {
            dispatch({ type: FETCH_ONLINECOMPLAINS, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteOnlinecomplain = (id) => async dispatch => {
    try {
        const res = await api.delete(`publics/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('publics')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_ONLINECOMPLAINS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Schedule has been deleted successfully.')
            }
        } else {
            //Alert message
            noti('error', 'Unsuccessfully!', 'Fail to delete.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}
