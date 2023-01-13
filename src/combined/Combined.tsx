import React from 'react';
import './Combined.css';
import Navigation from '../common/Navigation';
import { Container, Grid } from '@mui/material';
import GetCombinedData from './data/GetCombinedData';


const Combined: React.FC = () => {
  return (
    <Container maxWidth='md'>
      <Navigation
        numberPage={4} />
      <Grid container spacing={1}>
        <Grid item xs={8} >
          <GetCombinedData/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Combined;
