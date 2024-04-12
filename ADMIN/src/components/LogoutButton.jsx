import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/authAction';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
  
    // Clear 'mas_token' from localStorage using a Promise
    new Promise((resolve) => {
      localStorage.removeItem('mas_token');
      localStorage.removeItem('mas_decodedToken');
      resolve(); // Resolve the Promise after removing items
    }).then(() => {
      // Navigate to the login page
      navigate('/admin');
    });
  };

  return (
    <ExitToAppIcon onClick={handleLogout}/>
  );
};

export default LogoutButton;
