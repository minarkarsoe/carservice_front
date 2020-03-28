import {
  CREATE_ASSIGN,
  FETCH_ASSIGN,
  EDIT_ASSIGN,
  DELETE_ASSIGN,
  FETCH_ASSIGNS
} from "../actions/types";
import _ from "lodash";
const INTIAL_STATE = {
  list: [],
  assign: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ASSIGNS:
      return { ...state, list: action.payload, };
    case FETCH_ASSIGN:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ASSIGN:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ASSIGN:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ASSIGN:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};