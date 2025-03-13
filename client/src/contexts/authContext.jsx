import { useState, createContext, useContext, useEffect } from 'react';
import loginService from '../services/login';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if(savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (credentials) => {
    return loginService
      .login(credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        navigate('/');
      })
      .catch(error => {
        console.log(error.response.data.error);
        throw error.response.data.error;
      });
  }

  const logout = () => {
    setUser(null);
    navigate('/');
    localStorage.removeItem('user');
  }

  return(
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}


export const useAuth = () => useContext(AuthContext);