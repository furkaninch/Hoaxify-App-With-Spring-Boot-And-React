import * as ACTIONS from './Constants';
import {login,signup} from '../api/apiCalls';

export const onLogOut = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    };
}

export const loginSuccess = (authState) =>{
    return{
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    };
};

export const loginHandler = creds => {
    return async function(dispatch){
        const response =  await login(creds);
        const authState = {
                ...response.data.user,
                password: creds.password,
                token: response.data.token
        };
         dispatch(loginSuccess(authState));
         return response;
    }   
}

export const signUpHandler = body =>{
    return async function (dispatch){
       const response = await signup(body);
       await dispatch(loginHandler(body));
       return response;
    }
}

export const updateSuccess = ({displayName,image}) => {
    return{
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            displayName,
            image
        }
    }
} 