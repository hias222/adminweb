import React, { useState } from 'react';
import '../style/App.css';
import Navigation from '../common/Navigation';
import Grid from '@mui/material/Grid';
import StartIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendDatamapping from '../datamapping/SendDatamapping';
import RaceModes from '../datamapping/RaceModes';
import ChangeRaceStatus from '../datamapping/ChangeRaceStatus';
import { Card, CardContent, Container, Typography } from '@mui/material';

import './App.css';

const App = () => {

  const [eventnr, setEvent] = useState("1");
  const [heat, setHeat] = useState("1");
  const [lane, setLane] = useState("1");
  const [rank, setRank] = useState("1");

  let backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-mqtt" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-mqtt"

  const sendHeader = () => (event: any) => {
    console.log(backendConnect + " header " + eventnr + " " + heat)
    fetch(backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "header " + eventnr + " " + heat
      })
    })
      .catch(console.log)
  };

  const sendLane = () => (event: any) => {
    console.log(backendConnect + " lane " + lane + " 1:11,11 " + rank)

    fetch(backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "lane " + lane + " 1:11,11 " + rank
      })
    })
      .catch(console.log)
    //
  };

  const handleChange = (val: string) => (event: any) => {
    switch (val) {
      case "event":
        setEvent(event.target.value)
        break;
      case "heat":
        setHeat(event.target.value)
        break;
      case "lane":
        setLane(event.target.value)
        break;
      case "rank":
        setRank(event.target.value)
        break;
    }
  }

  return <div>
    <Container maxWidth='md'>
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
              onChange={handleChange('event')}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="wk-heat-app"
              label="Lauf"
              margin="normal"
              variant="outlined"
              onChange={handleChange('heat')}
            />
          </Grid>

          <Grid item xs={4}>
            <Button variant="contained" onClick={sendHeader()}>Send
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
              onChange={handleChange('lane')}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="wk-rank-app"
              label="rank"
              margin="normal"
              variant="outlined"
              onChange={handleChange('rank')}
            />
          </Grid>

          <Grid item xs={4}>
            <Button variant="contained" onClick={sendLane()}>Send
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
            Data
          </Typography>
          <Grid item xs={12}>
            <SendDatamapping
              event_type="" />
          </Grid>
        </CardContent></Card>

      </Grid>
    </Container>
  </div>
}

export default App;