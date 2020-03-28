import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_USERS,
    // FETCH_DEPARTMENT_ID,
    // FETCH_DEPARTMENT
} from './types';

import api from '../apis';
import { encryptId } from '../utils'
export const fetchUser = () => async dispatch => {
    try {
        const res = await  api.get(`users`)
        if (res.data) {
            dispatch({ type: FETCH_USERS, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}


export const putUser = (data,id) => async dispatch => {
    try {
        const res = await api.put(`users/${id}`, data);
        if (res.data.status=="success") {
                const dep=await api.get(`users`)
                if(dep.data.status=="success"){
                dispatch({ type: FETCH_USERS, payload: dep.data.data })
                noti('success', 'Successfully!', 'Account Creation has been updated successfully.')
                }

        } else {
            noti('error', 'Unsuccessfully!', 'Fail to update.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }

}

export const postUser = (data) => async dispatch => {
    try {
        const res = await api.post(`users`, data)
        if (res.data.status=="success") {
            const disres = await api.get('users')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_USERS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Account Creation has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteUser = (id) => async dispatch => {
    try {
        const res = await api.delete(`users/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('users')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_USERS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Account Creation has been deleted successfully.')
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
