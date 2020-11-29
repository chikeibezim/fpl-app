import axios from 'axios';
import React from 'react';
// import  router from 'react-router';

import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/app/current_user")
	 dispatch({ type: FETCH_USER, payload: res.data });
};
