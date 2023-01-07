import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import RaceIcon from '@material-ui/icons/SlowMotionVideo';
import StartlistIcon from '@material-ui/icons/ListAlt';
import ClockIcon from '@material-ui/icons/Watch';



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
          <Button variant="contained" color="default" onClick={this.sendAction('race')} fullWidth>
            Race
            <RaceIcon />
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Button variant="contained" color="default" onClick={this.sendAction('clock')} fullWidth>
            clock
            <ClockIcon />
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
        <Button variant="contained" color="default" onClick={this.sendAction('startlist')} fullWidth>
          Startlist
          <StartlistIcon />
        </Button>
        </Grid>
      </Grid >
    )
  };

};