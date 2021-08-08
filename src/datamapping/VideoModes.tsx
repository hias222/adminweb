import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import VideoIcon from '@material-ui/icons/Videocam';

export default class VideoModes extends React.Component {

  private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-mqtt" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-mqtt"

  sendAction = (version: string) => (event: any) => {
    console.log(this.backendConnect + " video " + version)
    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "video " + version
      })
    })
      .catch(console.log)
  };


  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button variant="contained" color="default" onClick={this.sendAction('1')}>
            1
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="default" onClick={this.sendAction('2')}>
            2
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="default" onClick={this.sendAction('3')}>
            3
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="default" onClick={this.sendAction('4')}>
            4
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="default" onClick={this.sendAction('5')}>
            5
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    )
  };

};