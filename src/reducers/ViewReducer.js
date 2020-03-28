import {
    CREATE_VIEW,
    FETCH_VIEW,
    EDIT_VIEW,
    DELETE_VIEW,
    FETCH_VIEWS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    view:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_VIEWS:
        return { ...state, list:action.payload, };
      case FETCH_VIEW:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_VIEW:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_VIEW:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_VIEW:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  