import React from 'react';
import '../style/App.css';
import Navigation from '../common/Navigation';
import Grid from '@mui/material/Grid';
import StartIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Card, CardContent, Container, Typography } from '@mui/material';

// get files http://jetson/resultdata/getmedia
// get files http://jetson/resultdata/getmedia?delete=file.mpx

/* interface Props {
  message: string;
} */

interface Props { }

interface State {
  type: string,
  event: string,
  shigh: string,
  slow: string,
};

class Hiit extends React.Component<Props, State> {
  state: State = {
    type: "hiit",
    event: "config",
    shigh: "30",
    slow: "10",
  };

  public message: string = "";

  private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-json" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-json"


  sendHeader = () => (event: any) => {
    console.log(this.backendConnect + " high " + this.state.shigh + " low " + this.state.slow)

    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .catch(console.log)
    //
  };

  startHiit = (mode: string) => (event: any) => {
    console.log(this.backendConnect + " high " + this.state.shigh + " low " + this.state.slow)

    var newEvent = { "type": "hiit", "event": mode }
    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    })
      .catch(console.log)
    //
  };

  handleChange = (val: string) => (event: any) => {
    switch (val) {
      case "shigh":
        this.setState({
          shigh: event.target.value
        });
        break;
      case "slow":
        this.setState({
          slow: event.target.value
        });
        break;
    }
  }

  render() {
    return (
      <Container maxWidth='md'>
        <Navigation
          numberPage={1}
        />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card >
              <CardContent>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6} sm={4} md={4}>
                    <TextField fullWidth
                      id="high"
                      label="high intensity"
                      margin="normal"
                      variant="outlined"
                      value={this.state.shigh}
                      onChange={this.handleChange('shigh')}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                    <TextField fullWidth
                      id="low"
                      label="low intensity"
                      margin="normal"
                      variant="outlined"
                      value={this.state.slow}
                      onChange={this.handleChange('slow')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Button variant="contained" fullWidth onClick={this.sendHeader()}>Send
                      <StartIcon /></Button>
                  </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} sm={6} md={6}>
                    <Button variant="contained" fullWidth onClick={this.startHiit('start')}>Start
                      <StartIcon /></Button>
                  </Grid>
                  <Grid item xs={12} sm={5} md={6}>
                    <Button variant="contained" fullWidth onClick={this.startHiit('stop')}>Stop
                      <StartIcon /></Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Container>
    );
  }
}


export default Hiit