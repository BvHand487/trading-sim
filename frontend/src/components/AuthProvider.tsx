import React, { useEffect } from 'react'
import { useState, useContext, createContext } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthContextData, UserCredentials } from '../utils/types';
import { Box, CircularProgress } from '@mui/material';
import { HttpStatusCode } from 'axios';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: any) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedToken = cookies.token;

    if (savedToken && savedUsername) {
      setAuthData(savedToken, savedUsername);
    }

    setLoading(false);
  }, [loading]);

  useEffect(() => { token; }, [token]);

  const clearAuthData = () => {
    setIsAuthed(false);
    setError(null);
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
    setAuthLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      if (response.status == HttpStatusCode.Ok) {
        const data = await response.text();
        setAuthData(data, creds.username);
        navigate("/home");
      }
      else {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }
    }
    catch (err: any) {
      setError(err.message || "Unexpected error");
    }
    finally {
      setAuthLoading(false);
    }
  };

  const signup = async (creds: UserCredentials) => {
    setAuthLoading(true);
    setError(null);

    try {
        const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      if (response.status == HttpStatusCode.Created) {
        navigate("/login");
      }
      else
      {
        const data = await response.json();
        throw new Error(data.error || "Signup failed");
      }
    }
    catch (err: any) {
      setError(err.message || "Unexpected error");
    }
    finally {
      setAuthLoading(false);
    }
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
    logout: logout,
    isLoading: authLoading,
    error: error,
  };

  if (loading)
    return (
      <div className='fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2'>
        <CircularProgress />
      </div>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};