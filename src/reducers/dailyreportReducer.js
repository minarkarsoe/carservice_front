import {
    CREATE_DAILYREPORT,
    FETCH_DAILYREPORT,
    EDIT_DAILYREPORT,
    DELETE_DAILYREPORT,
    FETCH_DAILYREPORTS
  } from "../actions/types";
  // import _ from "lodash";
  const INTIAL_STATE = {
    list: [],
    dailyreport: {}
  };
  
  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_DAILYREPORTS:
        return { ...state, list: action.payload, };
      case FETCH_DAILYREPORT:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_DAILYREPORT:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_DAILYREPORT:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_DAILYREPORT:
        return { ...state, list: action.payload };
      default:
        return state;
    }
  };
  