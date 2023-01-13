import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import RaceIcon from '@mui/icons-material/SlowMotionVideo';
import StartlistIcon from '@mui/icons-material/ListAlt';
import ClockIcon from '@mui/icons-material/Watch';



export default class RaceModes extends React.Component {

  private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-mqtt" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-mqtt"

  sendAction = (message: string) => (event: any) => {
    console.log(this.backendConnect + " " + message)
    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": message
      })
    })
      .catch(console.log)
  };


  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={4}>
          <Button variant="contained" onClick={this.sendAction('race')} fullWidth>
            Race
            <RaceIcon />
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Button variant="contained" onClick={this.sendAction('clock')} fullWidth>
            clock
            <ClockIcon />
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Button variant="contained" onClick={this.sendAction('startlist')} fullWidth>
            Startlist
            <StartlistIcon />
          </Button>
        </Grid>
      </Grid >
    )
  };

};