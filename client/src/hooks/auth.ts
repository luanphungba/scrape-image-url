import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser]: [any, any] = useState(null);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      setIsLoggedIn(true);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  return {
    isLoggedIn,
    user
  };
};

export default useAuth;