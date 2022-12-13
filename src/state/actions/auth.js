import { AUTH } from '../../constants/actionTypes';
import * as api from '../../api/index';

export const signIn = (formData, navigate, setIsLoading) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error.data);
    }
    setIsLoading(false);
}

export const signUp = (formData, navigate, setIsLoading) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });
        console.log(data);
        navigate('/');
    } catch (error) {
        console.log(error);
    }
    setIsLoading(false);
}