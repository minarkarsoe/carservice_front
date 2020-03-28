import history from '../router/history';
import { noti } from '../utils/index';
import {
     FETCH_DAILYREPORTS,
    // FETCH_DEPARTMENT_ID,
    // FETCH_DEPARTMENT
} from './types';

import api from '../apis';
import { encryptId } from '../utils'
export const fetchDailyreport = () => async dispatch => {
    try {
        const res = await  api.get(`dailyreport`)
        if (res.data) {
            dispatch({ type: FETCH_DAILYREPORTS, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}


export const putDailyreport = (data,id) => async dispatch => {
    try {
        const res = await api.put(`dailyreport/${id}`, data);
        if (res.data.status=="success") {
                const dep=await api.get(`dailyreport`)
                if(dep.data.status=="success"){
                dispatch({ type: FETCH_DAILYREPORTS, payload: dep.data.data })
                noti('success', 'Successfully!', 'Department has been updated successfully.')
                }

        } else {
            noti('error', 'Unsuccessfully!', 'Fail to update.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }

}

export const postDailyreport = (data) => async dispatch => {
    try {
        const res = await api.post(`dailyreport`, data)
        if (res.data.status=="success") {
            const disres = await api.get('dailyreport')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_DAILYREPORTS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Department has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteDailyreport = (id) => async dispatch => {
    try {
        const res = await api.delete(`dailyreport/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('dailyreport')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_DAILYREPORTS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Dailyreport has been deleted successfully.')
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
// export const fetchContractId = (Id) => async dispatch => {
//     try {
//         const res = await api.get(/Contract/${Id})
//         if (res.data) {
//             dispatch({ type: FETCH_CONTRACT_ID, payload: res.data.data })

//         } else {
//             //Alert message

//         }
//     }
//     catch (error) {
//         console.log(error);
//         noti('error', 'Error', 'Cannot get data from server!!!')
//     }
// }


// export const postContract = (data) => async dispatch => {
//     try {
//         const res = await api.post(/Contract, data)
//         if (res.data) {
//             const disres = await api.get('/Contract')
//             if (disres.data) {
//                 dispatch({ type: FETCH_CONTRACT, payload: disres.data.data })
//                 noti('success', 'Successfully!', 'Contract has been created Successfully.')
//             }
//             history.push('/Contract/Detail/' + encryptId(res.data.data.id));
//         } else {
//             noti('error', 'Unsuccessfully', 'Fail to create.')
//         }
//     }
//     catch (error) {
//         console.log(error);
//         noti('error', 'Error', 'Cannot get data from server!!!')
//     }
// }
