import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import StartIcon from '@mui/icons-material/PlayArrow';
import TextField from '@mui/material/TextField';

interface Props {
  type: string;
}

interface State {
  message: string,
  backend: [],
  event: string,
  heat: string,
  lane: string,
  rank: string,
};


export default class SendMessages extends React.Component<Props, State> {

  state: State = {
    message: "start",
    backend: [],
    event: "1",
    heat: "1",
    lane: "1",
    rank: "1"
  };

  private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-mqtt" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-mqtt"

  sendMessage = (message: string) => (event: any) => {
    console.log(this.backendConnect + " " + message + " " + this.state.message)
    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "message " + this.state.message
      })
    })
      .catch(console.log)

  };

  handleChange = (val: string) => (event: any) => {
    switch (val) {
      case "message":
        this.setState({
          message: event.target.value
        });
        break;
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8} >
          <TextField
            id="standard-name"
            label="Message"
            margin="dense"
            variant="filled"
            fullWidth
            multiline
            rows="5"
            onChange={this.handleChange('message')}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Button variant="contained" fullWidth onClick={this.sendMessage('message')}>Send
            <StartIcon /></Button>
        </Grid>
      </Grid>

    )
  };

};