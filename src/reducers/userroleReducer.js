import {
    CREATE_USERROLE,
    FETCH_USERROLE,
    EDIT_USERROLE,
    DELETE_USERROLE,
    FETCH_USERROLES
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    view:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_USERROLES:
        return { ...state, list:action.payload, };
      case FETCH_USERROLE:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_USERROLE:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_USERROLE:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_USERROLE:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  