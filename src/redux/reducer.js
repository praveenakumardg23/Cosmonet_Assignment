import {Actions} from "./actions";

const defaultState = {
  userDefaultList: [],
  filteredResult: [],
  selectedUser: {}
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Actions.GET_USER_LIST:
        return {
            ...state,
            userDefaultList: action.data,
            filteredResult: action.data
        }
    case Actions.FILTER_LIST:
        return {
            ...state,
            filteredResult: action.data
        }
    case Actions.SET_SELECTED_USER:
        return {
            ...state,
            selectedUser: action.data
        }
    default:
      return state;
  }
};

export default userReducer;