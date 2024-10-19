import { useState, useEffect } from 'react';
import {jwtDecode } from 'jwt-decode'; 
import Cookies from 'js-cookie';

const useDecodeToken = () => {
  const [data, setData] = useState([]); 

  useEffect(() => {
    const token = Cookies.get('jwt'); 
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        // console.log(decodedToken); 
        setData(decodedToken); 
      } catch (error) {
        console.error('Error decoding JWT:', error); 
      }
    } else {
      console.log('No token found'); 
    }
  }, []); 

  return { data }; 
};

export default useDecodeToken;
