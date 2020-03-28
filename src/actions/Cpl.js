import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_CPLS,
    // FETCH_DEPARTMENT_ID,
    // FETCH_DEPARTMENT
} from './types';

import api from '../apis';
import { encryptId } from '../utils'
export const fetchCpl = () => async dispatch => {
    try {
        const res = await  api.get(`customerpayment`)
        if (res.data) {
            dispatch({ type: FETCH_CPLS, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}


export const putCpl = (data,id) => async dispatch => {
    try {
        const res = await api.put(`customerpayment/${id}`, data);
        if (res.data.status=="success") {
                const dep=await api.get(`cpl`)
                if(dep.data.status=="success"){
                dispatch({ type: FETCH_CPLS, payload: dep.data.data })
                noti('success', 'Successfully!', 'Customer Payment Lists has been updated successfully.')
                }

        } else {
            noti('error', 'Unsuccessfully!', 'Fail to update.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }

}

export const postCpl = (data) => async dispatch => {
    try {
        const res = await api.post(`customerpayment`, data)
        if (res.data.status=="success") {
            const disres = await api.get('cpl')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_CPLS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Customer Payment Lists has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteCpl = (id) => async dispatch => {
    try {
        const res = await api.delete(`customerpayment/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('cpl')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_CPLS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Customer Payment Lists has been deleted successfully.')
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
