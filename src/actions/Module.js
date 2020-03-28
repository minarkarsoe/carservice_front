import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_MODULES,
   
} from './types';

import api from '../apis';
import { encryptId } from '../utils'
export const fetchModule = () => async dispatch => {
    try {
        const res = await  api.get(`modules`)
        if (res.data) {
            dispatch({ type: FETCH_MODULES, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}


export const putModule = (data,id) => async dispatch => {
    try {
        const res = await api.put(`modules/${id}`, data);
        if (res.data.status=="success") {
                const dep=await api.get(`modules`)
                if(dep.data.status=="success"){
                dispatch({ type: FETCH_MODULES, payload: dep.data.data })
                noti('success', 'Successfully!', 'Module has been updated successfully.')   
                }      

        } else {
            noti('error', 'Unsuccessfully!', 'Fail to update.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }

}

export const postModule = (data) => async dispatch => {
    try {
        const res = await api.post(`modules`, data)
        if (res.data.status=="success") {
            const disres = await api.get('module')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_MODULES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Module has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteModule = (id) => async dispatch => {
    try {
        const res = await api.delete(`modules/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('modules')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_MODULES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Module has been deleted successfully.')
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


