import React, { useEffect, useState } from 'react';
import './Display.css';
import Navigation from '../common/Navigation';
import { Button, Container, Divider, Grid, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Check, Close } from '@mui/icons-material';


const Display: React.FC = () => {

  const [nuvoRunning, setNuvoRunning] = useState(false);
  const [chromeState, setChromeState] = useState(false);
  const [nuvoStatus, setNuvoStatus] = useState("");
  const [nuvoIP, setNuvoIP] = useState("");
  const [ipState, setIpState] = useState(false);
  const [brightness, setBrightness] = useState("1");
  const [px, setPx] = useState(1);
  const [py, setPy] = useState(2);
  const [sleepms, setSleepms] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [screennumber, setScreennumber] = useState(0);
  const [starturl, setStarturl] = useState("http://localhost/display");

  let nuvoParameters = {
    "brightness": brightness,
    "px": px,
    "py": py,
    "rotation": rotation,
    "screennumber": screennumber,
    "s": sleepms
  }

  let chromeParameter = {
    "url": starturl
  }

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

  function getIpState() {
    console.log(backendConnect + "/main/ipstate")
    fetch(backendConnect + "/main/ipstate")
      .then(res =>
        res.json()
      )
      .then((data) => {
        return setIpState(data.ipstate);
      })
      .catch(console.log)
    console.log("getIpState")
  }

  function getChromeState() {
    console.log(backendConnect + "/main/statuschrome")
    fetch(backendConnect + "/main/statuschrome")
      .then(res =>
        res.json()
      )
      .then((data) => {
        return setChromeState(data.state);
      })
      .catch(console.log)
    console.log("getChromeState")
  }

  function getNuvoRunning() {
    console.log(backendConnect + "/main/statusonoff")
    fetch(backendConnect + "/main/statusonoff")
      .then(res =>
        res.json()
      )
      .then((data) => {
        return setNuvoRunning(data.state);
      })
      .catch(console.log)
  }

  function getNuvoIP() {
    console.log(backendConnect + "/main/ip")
    fetch(backendConnect + "/main/ip")
      .then(res =>
        res.text()
      )
      .then((data) => {
        return setNuvoIP(data);
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
      ).then(() => refreshState())
      .catch(console.log)
  }

  function startChrom() {
    console.log(backendConnect + "/main/startchromium")
    fetch(backendConnect + "/main/startchromium", {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chromeParameter)
    })
      .then(res =>
        console.log(res.text())
      ).then(() => refreshState())
      .catch(console.log)
  }

  function stopChrom() {
    console.log(backendConnect + "/main/stopchromium")
    fetch(backendConnect + "/main/stopchromium", {
      method: 'POST'
    })
      .then(res =>
        console.log(res.text())
      ).then(() => refreshState())
      .catch(console.log)
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
      ).then(() => refreshState())
      .catch(console.log)
  }

  const getLenexCode = () => (event: any) => {
    getNuvoState()
  };

  const getIPData = () => (event: any) => {
    getNuvoIP()
  };

  const sendDetailStart = () => (event: any) => {
    startNuvoDetail()
  };


  const sendNuvoStop = () => (event: any) => {
    stopNuvo()
  };

  const sendChromStart = () => (event: any) => {
    startChrom()
  };

  const sendChromStop = () => (event: any) => {
    stopChrom()
  };

  const setPxValue = (event: SelectChangeEvent) => {
    console.log("setPxValue")
    setPx(parseInt(event.target.value))
  };

  const setPyValue = (event: SelectChangeEvent) => {
    console.log("setPyValue")
    setPy(parseInt(event.target.value))
  };

  const setValueSleepms = (event: SelectChangeEvent) => {
    console.log("setPyValue")
    setSleepms(parseInt(event.target.value))
  };


  const setBrightnessValue = (event: SelectChangeEvent) => {
    console.log("setBrightnessValue")
    setBrightness(event.target.value)
  };

  const updateUrlText = (event: any) => {
    console.log(event.target.value)
    setStarturl(event.target.value)
  }

  const setGross = () => (event: any) => {
    setBrightness("3")
    setPx(4)
    setPy(3)
  };

  const setKlein = () => (event: any) => {
    setBrightness("2")
    setPx(1)
    setPy(2)
  };

  function getStatusButton(status: Boolean) {
    if (status) return <Check />
    else return <Close />

  }

  function refreshState() {
    getIpState();
    getNuvoRunning();
    getChromeState();
  }

  const getRefreshState = () => (event: any) => {
    refreshState()
  };


  useEffect(() => {
    console.log("start")
    getNuvoState();
    refreshState();
  }, []);

  return (
    <Container maxWidth='md' key={1234}>
      <Navigation
        numberPage={1} />

      <Grid container spacing={1}>

        <Grid item xs={6} sm={4} md={3}>
          <Button variant="contained" onClick={getRefreshState()} key={94526}>Refresh
          </Button>
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          IP:
          {getStatusButton(ipState)}
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          Display:
          {getStatusButton(nuvoRunning)}
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          Chrome:
          {getStatusButton(chromeState)}
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField id="standard-basic" fullWidth label="Start URL" variant="standard" value={starturl} onChange={updateUrlText} />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Button variant="contained" onClick={sendDetailStart()} key={14456}>Display Start
          </Button>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Button variant="contained" onClick={sendNuvoStop()} key={12456}>Display Stop
          </Button>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Button variant="contained" onClick={sendChromStart()} key={77456}>Chrome Start
          </Button>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Button variant="contained" onClick={sendChromStop()} key={14456}>Chrome Stop
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          PX:
          <Select
            labelId="x"
            id="px1"
            value={px.toString()}
            label="px"
            onChange={setPxValue}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </Grid>



        <Grid item xs={6} sm={4} md={2}>
          PY:
          <Select
            labelId="py"
            id="py1"
            value={py.toString()}
            label="py"
            onChange={setPyValue}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </Grid>


        <Grid item xs={6} sm={4} md={4}>
          Brightness:
          <Select
            labelId="x"
            id="BrightnessValue"
            value={brightness}
            label="brightness"
            onChange={setBrightnessValue}
          >
            <MenuItem value={0.4}>0.4 innen</MenuItem>
            <MenuItem value={0.6}>0.6 neutral</MenuItem>
            <MenuItem value={1}>1 normal</MenuItem>
            <MenuItem value={2}>2 hell</MenuItem>
            <MenuItem value={3}>3 sehr hell</MenuItem>
          </Select>
        </Grid>


        <Grid item xs={6} sm={4} md={4}>
          sleepms:
          <Select
            labelId="s"
            id="sleepmsvalue"
            value={sleepms.toString()}
            label="sleepms"
            onChange={setValueSleepms}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
          </Select>
        </Grid>

        sleepms

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={setKlein()} key={12456}>set klein
          </Button>
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={setGross()} key={12456}>set groß
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={getLenexCode()} key={12456}>GetState
          </Button>
        </Grid>
        <Grid item xs={10}>
          <TextField
            disabled
            id="outlined-disabled"
            label="nuvoStatus"
            defaultValue="please reload"
            multiline
            maxRows={4}
            fullWidth
            value={nuvoStatus}
          />
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={getIPData()} key={12456}>GetIP
          </Button>
        </Grid>
        <Grid item xs={10}>
          <TextField
            disabled
            id="outlined-disabled"
            label="IP"
            defaultValue="please reload"
            multiline
            maxRows={6}
            fullWidth
            value={nuvoIP}
          />
        </Grid>

      </Grid>

    </Container >
  );
}

export default Display;
