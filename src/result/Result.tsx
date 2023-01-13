import React from 'react';
import './Result.css';
import Navigation from '../common/Navigation';
import Upload from './upload/Upload';
import GetResultData from './data/GetResultData';
import { Container, Grid } from '@mui/material';
import GetClubList from './data/GetClubList';

const Result: React.FC = () => {
  return (
    <Container maxWidth='md'>
      <Navigation
        numberPage={3} />
      <Grid container spacing={1}>
        <Grid item xs={8} >
          <GetResultData />
        </Grid>
        <Grid item xs={4} >
          <Upload
            message='Lenex Upload'
          />
        </Grid>
        <Grid item xs={12} >
          <GetClubList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Result;
