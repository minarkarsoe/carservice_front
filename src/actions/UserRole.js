import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_USERROLES,
    // FETCH_DEPARTMENT_ID,
    // FETCH_DEPARTMENT
} from './types';

import api from '../apis';
import { encryptId } from '../utils'
export const fetchUserrole = () => async dispatch => {
    try {
        const res = await  api.get(`user_roles`)
        if (res.data) {
            dispatch({ type: FETCH_USERROLES, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Define Account Creation with Role  get data from server!!!')
    }
}

export const postUserrole = (data) => async dispatch => {
    try {
        const res = await api.post(`user_roles`, data)
        if (res.data.status=="success") {
            const disres = await api.get('user_roles')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_USERROLES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Define Account Creation with Role has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteUserrole = (id) => async dispatch => {
    try {
        const res = await api.delete(`user_roles/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('user_roles')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_USERROLES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Define Account Creation with Role has been deleted successfully.')
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
