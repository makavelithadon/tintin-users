import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "./types";

export const login = payload => ({ type: LOGIN, payload });

export const loginSuccess = payload => ({ type: LOGIN_SUCCESS, payload });

export const loginError = payload => ({ type: LOGIN_ERROR, payload });

export const logout = () => ({ type: LOGOUT });
