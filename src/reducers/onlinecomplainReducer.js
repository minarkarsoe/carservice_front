import {
    CREATE_ONLINECOMPLAIN,
    FETCH_ONLINECOMPLAIN,
    EDIT_ONLINECOMPLAIN,
    DELETE_ONLINECOMPLAIN,
    FETCH_ONLINECOMPLAINS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    model:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_MODULES:
        return { ...state, list:action.payload, };
      case FETCH_MODULE:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_MODULE:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_MODULE:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_MODULE:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  