import React from 'react';
import './Result.css';
import Navigation from '../common/Navigation';
import Upload from './upload/Upload';
import Grid from '@material-ui/core/Grid';
import GetResultData from './data/GetResultData';

const Result: React.FC = () => {
  return (
    <div className="App">
      <Navigation
        numberPage={3} />
      <Grid>
        <GetResultData />
        <Upload
          message='Hello'
        />
      </Grid>
    </div>
  );
}

export default Result;
