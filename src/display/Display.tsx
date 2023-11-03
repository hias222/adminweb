import React, { useEffect, useState } from 'react';
import './Display.css';
import Navigation from '../common/Navigation';
import { Button, Container, Divider, Grid, Paper, Typography } from '@mui/material';


const Display: React.FC = () => {

  const [eventType, setEventType] = useState([]);
  const [startList, setStartList] = useState([]);

  let staticURL = process.env.REACT_APP_DATAMAPPING_INTERNAL_URL !== undefined ? process.env.REACT_APP_DATAMAPPING_INTERNAL_URL : 'localhost'
  let backendConnect = process.env.REACT_APP_DATAMAPPING_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port : staticURL;

  function queryLenexState(){
    console.log(backendConnect + "/datamapping/configuration")
    fetch(backendConnect + "/datamapping/configuration")
      .then(res => res.json())
      .then((data) => {
        setEventType(data.event_type)
        setStartList(data.lenex_startlist)
      })
      .catch(console.log)
      console.log("getLenexCode")
  }
  const getLenexCode = () => (event: any) => {
    queryLenexState()
  };

  useEffect(() => {
    console.log("start")
    queryLenexState();
  }, []);

  return (
    <Container maxWidth='md' key={1234}>
      <Navigation
        numberPage={5} />

      <Grid container spacing={1}>

        <Grid item xs={4}>
          <Button variant="contained" onClick={getLenexCode()} key={12456}>GetState Lenex
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={3} >
            <Typography variant="subtitle1" >
              LenexMode: {eventType}
            </Typography>
            <Typography variant="subtitle1" >
              StartList: {startList}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid item xs={12}>
          <Divider />
        </Grid>

    </Container >
  );
}

export default Display;
