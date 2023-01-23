import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import useAuth from "../hooks/useAuth";

const UserPage = () => {
  const { auth } = useAuth();

  useEffect(() => {
    
  }, []);

  return (
    <Box className="user-page">
        {auth?.username || "No username"}
    </Box>
  )
}

export default UserPage
