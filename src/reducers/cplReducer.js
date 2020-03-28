import {
    CREATE_CPL,
    FETCH_CPL,
    EDIT_CPL,
    DELETE_CPL,
    FETCH_CPLS
  } from "../actions/types";
 // import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    cpl:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_CPLS:
        return { ...state, list:action.payload, };
      case FETCH_CPL:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_CPL:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_CPL:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_CPL:
        return { ...state, list: action.payload };
      default:
        return state;
    }
  };
  
