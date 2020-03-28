import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';
import locale from './localeReducer'
import positionReducer from './postionReducer';
import modelReducer from './modelReducer';
import loadingReducer from './loadingReducer'
import departmentReducer from './departmentReducer'
import machineReducer from './machineReducer'
import employeeReducer from './employeeReducer'
//  HEAD
import complainReducer from './complainReducer'
import assignReducer from './assignReducer'
import serviceReducer from './serviceReducer';
import scheduleReducer from './scheduleReducer'
import ViewReducer from './ViewReducer';
import dailyreportReducer from './dailyreportReducer'
import moduleReducer from './moduleReducer'
import CplReducer from './cplReducer';
import userReducer from './userReducer';
import roleReducer from './roleReducer';
import userroleReducer from './userroleReducer'

// 720cca248471c6c8c4fdb426ee426613fcf1a159

export default combineReducers({
    userrole:userroleReducer,
    role:roleReducer,
    user:userReducer,
    model:modelReducer,
    auth: authReducer,
    streams: streamReducer,
    employee: employeeReducer,
    department: departmentReducer,
    position: positionReducer,
    machine: machineReducer,
    complain: complainReducer,
    assign: assignReducer,
    dailyreport: dailyreportReducer,
    cpl: CplReducer,
    schedule: scheduleReducer,
    module: moduleReducer,
    view: ViewReducer,
    service:serviceReducer,
    locale,
    loading: loadingReducer
});
