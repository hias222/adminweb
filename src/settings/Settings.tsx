import React from 'react';
import './Settings.css';
import Navigation from '../common/Navigation';
import Upload from './upload/Upload';
import { Container } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Container maxWidth='md'>
      <Navigation
        numberPage={2} />
      <Upload
        message='Hello'
      />
      <p>
        mosquitto_sub -h localhost -t error
      </p>
    </Container>
  );
}

export default Settings;
