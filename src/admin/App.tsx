import React from 'react';
import '../style/App.css';
import Navigation from '../common/Navigation';
import Grid from '@material-ui/core/Grid';
import StartIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendDatamapping from '../datamapping/SendDatamapping';
import RaceModes from '../datamapping/RaceModes';
import VideoModes from '../datamapping/VideoModes';
import ChangeRaceStatus from '../datamapping/ChangeRaceStatus';
import { Card, CardContent, Typography } from '@material-ui/core';

interface Props {
  message: string;
}

interface State {
  message: string,
  backend: [],
  event: string,
  heat: string,
  lane: string,
  rank: string,
};

export default class admin extends React.Component<Props, State> {
  state: State = {
    message: "start",
    backend: [],
    event: "1",
    heat: "1",
    lane: "1",
    rank: "1"
  };

  public message: string = "";

  private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-mqtt" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-mqtt"


  sendHeader = () => (event: any) => {
    console.log(this.backendConnect + " header " + this.state.event + " " + this.state.heat)

    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "header " + this.state.event + " " + this.state.heat
      })
    })
      .catch(console.log)
    //
  };

  sendLane = () => (event: any) => {
    console.log(this.backendConnect + " lane " + this.state.lane + " 1:11,11 " + this.state.rank)

    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "lane " + this.state.lane + " 1:11,11 " + this.state.rank
      })
    })
      .catch(console.log)
    //
  };

  handleChange = (val: string) => (event: any) => {
    switch (val) {
      case "event":
        this.setState({
          event: event.target.value
        });
        break;
      case "heat":
        this.setState({
          heat: event.target.value
        });
        break;
      case "lane":
        this.setState({
          lane: event.target.value
        });
        break;
      case "rank":
        this.setState({
          rank: event.target.value
        });
        break;
    }
  };


  render() {

    return (
      <div>
        <Navigation numberPage={0}
        />

        <Grid container spacing={2}>
          <Card><CardContent>
            <Typography color="textSecondary" gutterBottom>
              Show Section
            </Typography>
            <Grid item xs={12}>
              <RaceModes />
            </Grid>
          </CardContent></Card>
          <Card><CardContent>
          <Typography color="textSecondary" gutterBottom>
                Event/Heat
              </Typography>
            <Grid item xs={4}>
              <TextField
                id="wk-nr-app"
                label="Wettkampf"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange('event')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="wk-heat-app"
                label="Lauf"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange('heat')}
              />
            </Grid>

            <Grid item xs={4}>
              <Button variant="contained" color="default" onClick={this.sendHeader()}>Send
                <StartIcon /></Button>
            </Grid>
          </CardContent></Card>

          <Card><CardContent>
          <Typography color="textSecondary" gutterBottom>
                Heat/Lane
              </Typography>
            <Grid item xs={4}>
              <TextField
                id="wk-lane-app"
                label="Lane"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange('lane')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="wk-rank-app"
                label="rank"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange('rank')}
              />
            </Grid>

            <Grid item xs={4}>
              <Button variant="contained" color="default" onClick={this.sendLane()}>Send
                <StartIcon /></Button>
            </Grid>

          </CardContent></Card>

          <Card><CardContent>
          <Typography color="textSecondary" gutterBottom>
                State
              </Typography>
            <Grid item xs={12}>
              <ChangeRaceStatus />
            </Grid>
          </CardContent></Card>

          <Card><CardContent>
          <Typography color="textSecondary" gutterBottom>
                Video
              </Typography>
            <Grid item xs={12}>
              <VideoModes />
            </Grid>
          </CardContent></Card>

          <Card><CardContent>
          <Typography color="textSecondary" gutterBottom>
                Data
              </Typography>
            <Grid item xs={12}>
              <SendDatamapping
                event_type="" />
            </Grid>
          </CardContent></Card>

        </Grid>

      </div>
    );
  }
}