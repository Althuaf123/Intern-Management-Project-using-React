import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const UnauthorizedContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const UnauthorizedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '400px',
  textAlign: 'center',
}));

const Unauthorized = () => {

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/intern-home');
  };
  return (
    <UnauthorizedContainer>
      <UnauthorizedPaper elevation={3}>
        <Typography variant="h5" sx={{ color: 'red' }} gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1">
          Sorry, you do not have authorization to access this page.
        </Typography>
        <Button onClick={handleGoHome}>Go Home</Button>
      </UnauthorizedPaper>
    </UnauthorizedContainer>
  );
};

export default Unauthorized;
