import {
    CREATE_USER,
    FETCH_USER,
    EDIT_USER,
    DELETE_USER,
    FETCH_USERS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    view:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_USERS:
        return { ...state, list:action.payload, };
      case FETCH_USER:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_USER:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_USER:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_USER:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  