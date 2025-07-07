import React, { useEffect } from 'react'
import { useState, useContext, createContext } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContextData, UserCredentials } from '../types/types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: any) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedToken = cookies.token;

    if (savedToken && savedUsername) {
      setAuthData(savedToken, savedUsername);
    }
  }, []);

  useEffect(() => { console.log("updated token state.", token) }, [token]);

  const clearAuthData = () => {
    setIsAuthed(false);
    setUser("");
    setToken("");
    localStorage.removeItem("username");
    removeCookie("token");
  }

  const setAuthData = (savedToken: string, savedUsername: string) => {
    setIsAuthed(true);
    setUser(savedUsername);
    setToken(savedToken);
    localStorage.setItem("username", savedUsername);
    setCookie("token", savedToken, { path: '/' });
  }

  const login = async (creds: UserCredentials) => {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });

    const data = await response.text();
    setAuthData(data, creds.username);
    navigate("/home");
  };

  const signup = async (creds: UserCredentials) => {
    const response = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });


  };

  const logout = () => {
    clearAuthData();
    navigate("/login");
  };

  const value: AuthContextData = {
    isAuthed: isAuthed,
    username: user,
    token: token,
    login: login,
    signup: signup,
    logout: logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};