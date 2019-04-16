import axios from 'axios';
import {push} from 'connected-react-router';

// types of action
export const Actions = {
    GET_USER_LIST: 'GET_USER_LIST',
    FILTER_LIST: 'FILTER_LIST',
    SET_SELECTED_USER: 'SET_SELECTED_USER'
};

// actions
export const getUserListSuccess = data => {
    return {
        type: Actions.GET_USER_LIST,
        data
    }
};

export const filterSuccess = data => {
    return {
        type: Actions.FILTER_LIST,
        data
    }
};

export const setSelectedUser = data => {
    return {
        type: Actions.SET_SELECTED_USER,
        data
    }
};

export function getUserList() { 
    return (dispatch) => {
        axios.get('http://demo9197058.mockable.io/users')          
          .then(resp => {
            dispatch(getUserListSuccess(resp.data));
          })
          .catch(err => {
            console.log(err);
          })
      }
}

export function filterList(data) { 
    return (dispatch, getState) => {
        let userList = getState().reducer.userDefaultList;
        let filteredList = data ? userList.filter((user) => {
            return user.first_name === data;
        }) : userList;
        dispatch(filterSuccess(filteredList))
    }
}

export function goToDetailsPage(id) {
    return (dispatch, getState) => {
        dispatch(push('/user/' + id))
    }
}

export function getSelectedUser(id) {
    return (dispatch, getState) => {
        debugger;
        let userList = getState().reducer.userDefaultList;
        let selectedUser = userList.find((user) => {
            return user.id === id;
        })
        dispatch(setSelectedUser(selectedUser))
    }
}



