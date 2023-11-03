import React, { useEffect, useState } from 'react';
import './Display.css';
import Navigation from '../common/Navigation';
import { Button, Container, Divider, Grid, Paper, Typography } from '@mui/material';


const Display: React.FC = () => {

  const [nuvoRunning, setNuvoRunning] = useState("");
  const [nuvoStatus, setNuvoStatus] = useState("");

  let staticURL = process.env.REACT_APP_DATAMAPPING_INTERNAL_URL !== undefined ? process.env.REACT_APP_DATAMAPPING_INTERNAL_URL : 'localhost'
  let backendConnect = process.env.REACT_APP_DATAMAPPING_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port : staticURL;

  function getNuvoState() {
    console.log(backendConnect + "/main/status")
    fetch(backendConnect + "/main/status")
      .then(res =>
        res.text()
      )
      .then((data) => {
        return setNuvoStatus(data);
      })
      .catch(console.log)
    console.log("getLenexCode")
  }

  function getNuvoRunning() {
    console.log(backendConnect + "/main/statusonoff")
    fetch(backendConnect + "/main/statusonoff")
      .then(res =>
        res.text()
      )
      .then((data) => {
        return setNuvoRunning(data);
      })
      .catch(console.log)
  }

  function stopNuvo() {
    console.log(backendConnect + "/main/stop")
    fetch(backendConnect + "/main/stop", {
      method: 'POST'
    })
      .then(res =>
        console.log(res.text())
      )
      .catch(console.log)
  }

  function startNuvo() {
    console.log(backendConnect + "/main/start")
    fetch(backendConnect + "/main/start", {
      method: 'POST'
    })
      .then(res =>
        console.log(res.text())
      )
      .catch(console.log)
  }

  let nuvoParameters = {
    "brightness" : "1",
    "px": 1,
    "py": 2,
    "rotation": 0,
    "screennumber": 0
    }


  function startNuvoDetail() {
    console.log(backendConnect + "/main/startparamter")
    fetch(backendConnect + "/main/startparamter", {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuvoParameters)
    })
      .then(res =>
        console.log(res.text())
      )
      .catch(console.log)
  }

  const getLenexCode = () => (event: any) => {
    getNuvoState()
  };

  const sendDetailStart = () => (event: any) => {
    startNuvoDetail()
  };

  const sendNuvoStart = () => (event: any) => {
    startNuvo()
  };

  const sendNuvoStop = () => (event: any) => {
    stopNuvo()
  };

  const getButtonNuvoRunning = () => (event: any) => {
    getNuvoRunning()
  };

  useEffect(() => {
    console.log("start")
    getNuvoState();
    getNuvoRunning();
  }, []);

  return (
    <Container maxWidth='md' key={1234}>
      <Navigation
        numberPage={1} />

      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Button variant="contained" onClick={getLenexCode()} key={12456}>GetState
          </Button>
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3} >
            <Typography variant="subtitle1" >
              NuvoRunning: {nuvoStatus}
            </Typography>
          </Paper>
        </Grid>


        <Grid item xs={2}>
          <Button variant="contained" onClick={getButtonNuvoRunning()} key={12456}>Running
          </Button>
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3} >
            <Typography variant="subtitle1" >
              NuvoRunning: {nuvoRunning}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Button variant="contained" onClick={sendNuvoStart()} key={9456}>Start
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Button variant="contained" onClick={sendDetailStart()} key={14456}>DetailStart
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Button variant="contained" onClick={sendNuvoStop()} key={12456}>Stop
          </Button>
        </Grid>


      </Grid>


      <Grid item xs={12}>
        <Divider />
      </Grid>

    </Container >
  );
}

export default Display;
