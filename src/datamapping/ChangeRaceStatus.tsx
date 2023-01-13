import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import StartIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ClearIcon from '@mui/icons-material/RestoreFromTrash';


export default class ChangeRaceStatus extends React.Component {

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
        <Grid item xs={4}>
          <Button variant="contained" onClick={this.sendAction('start')}>
            Start
            <StartIcon />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={this.sendAction('stop')}>
            Stop
            <StopIcon />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={this.sendAction('clear')}>
            clear
            <ClearIcon />
          </Button>
        </Grid>
      </Grid>
    )
  };

};