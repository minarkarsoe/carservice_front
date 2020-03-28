import { SIGN_IN, SIGN_OUT, CURRENT_USER } from '../actions/types';

const INTIAL_STATE = {
    isSignedIn: false,
    isloaded: false,
    username: '',
    userid: '',
    roleid: ''
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                userid: action.payload.id,
                username: action.payload.userName,
                roleid: action.rolename,
                isloaded: action.isloaded
            };

        case SIGN_OUT:
            return {
                ...state,
                isSignedIn: false,
                username: '',
                userid: '',
                roleid: ''
            };

        case CURRENT_USER:
            return {
                ...state,
                isSignedIn: true,
                userid: action.payload.id,
                username: action.payload.userName,
                roleid: action.rolename
            };

        default:
            return state;
    }
};