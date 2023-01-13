import React from 'react';
import '../style/App.css';
import Navigation from '../common/Navigation';
import Grid from '@mui/material/Grid';
import StartIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import SendMessages from '../datamapping/SendMessages';
import RaceModes from '../datamapping/RaceModes';
import { Card, CardContent, Container, Typography } from '@mui/material';
import Upload from './upload/Upload';
import MediaData from './MediaData';

// get files http://jetson/resultdata/getmedia
// get files http://jetson/resultdata/getmedia?delete=file.mpx

/* interface Props {
  message: string;
} */

interface Props { }

interface State {
  message: string,
  backend: [],
  event: string,
  heat: string,
  lane: string,
  rank: string,
};

class Message extends React.Component<Props, State> {
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
                <Typography color="textSecondary" gutterBottom>
                  Show Section
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <RaceModes />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6} sm={4} md={4}>
                    <TextField fullWidth
                      id="wk-nr"
                      label="Wettkampf"
                      margin="normal"
                      variant="outlined"
                      onChange={this.handleChange('event')}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                    <TextField fullWidth
                      id="wk-heat"
                      label="Lauf"
                      margin="normal"
                      variant="outlined"
                      onChange={this.handleChange('heat')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Button variant="contained" fullWidth onClick={this.sendHeader()}>Send
                      <StartIcon /></Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Message
                </Typography>
                <Grid item xs={12}>
                  <SendMessages
                    type="standard" />
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  ShowMedia
                </Typography>
                <MediaData />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Media
                </Typography>
                <Upload
                  message='Media Upload'
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Container>
    );
  }
}


export default Message