import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import useAuth from "../hooks/useAuth";

const UserPage = () => {
  const { auth } = useAuth();

  useEffect(() => {
  }, []);

  return (
    <Box className="user-page">
        <Box className="active-user-page">
            <p className="username-text">Вы вошли в аккаунт: {auth?.username}</p>
        </Box>
    </Box>
  )
}

export default UserPage
