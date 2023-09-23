import React from 'react';
import '../style/App.css';
import Navigation from '../common/Navigation';
import Grid from '@mui/material/Grid';
import StartIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Card, CardContent, Container } from '@mui/material';
import { swimmerPosition } from './SwimmerPosition';

// get files http://jetson/resultdata/getmedia
// get files http://jetson/resultdata/getmedia?delete=file.mpx

/* interface Props {
  message: string;
} */

interface Props { }

interface State {
  type: string,
  event: string,
  departure: string,
  gap: string;
  varianz: string;
  rows: swimmerPosition[];
};

class Hiit extends React.Component<Props, State> {

  rows: swimmerPosition[] = [
    { id: '1', order: 1, intensity: '20' },
    { id: '2', order: 2, intensity: '22' },
    { id: '3', order: 3, intensity: '0' },
    { id: '4', order: 4, intensity: '0' },
    { id: '5', order: 5, intensity: '0' },
    { id: '6', order: 6, intensity: '0' },
    { id: '7', order: 7, intensity: '0' },
    { id: '8', order: 8, intensity: '0' },
  ];

  state: State = {
    type: "hiit",
    event: "config",
    departure: "30",
    gap: "5",
    varianz: "1",
    rows: this.rows
  };

  columns: GridColDef[] = [
    { field: 'order', headerName: 'Order', width: 40 },
    {
      field: 'intensity',
      headerName: 'Intense s',
      width: 100,
      editable: true,
    },
  ];


  public message: string = "";
  private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-json" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-json"


  sendHeader = () => (event: any) => {
    console.log(this.backendConnect + " departure " + this.state.departure)

    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .catch(console.log)
    //
  };

  saveData = () => (event: any) => {
    console.log(event.row)
    console.log(this.state.rows)

  };

  processRowUpdate = (newRow: swimmerPosition) => {
    var newRows = this.state.rows.map((row) => (row.id === newRow.id ? newRow : row))
    this.setState({ rows: newRows })
    return newRow;
  };

  startHiit = (mode: string) => (event: any) => {
    console.log(this.backendConnect + " deaparture " + this.state.departure)

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
      case "departure":
        this.setState({
          departure: event.target.value
        });
        break;
      case "gap":
        this.setState({
          gap: event.target.value
        });
        break;
      case "varianz":
        this.setState({
          varianz: event.target.value
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
                      label="departure"
                      margin="normal"
                      variant="outlined"
                      value={this.state.departure}
                      onChange={this.handleChange('departure')}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                    <TextField fullWidth
                      id="high"
                      label="gap"
                      margin="normal"
                      variant="outlined"
                      value={this.state.gap}
                      onChange={this.handleChange('gap')}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                    <TextField fullWidth
                      id="high"
                      label="varianz"
                      margin="normal"
                      variant="outlined"
                      value={this.state.varianz}
                      onChange={this.handleChange('varianz')}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={0} alignItems="center">
                  <DataGrid
                    rows={this.state.rows}
                    columns={this.columns}
                    //editMode="row"
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    //disableRowSelectionOnClick
                    //disableColumnMenu
                    processRowUpdate={this.processRowUpdate}
                  //onCellEditStop={this.saveData()}
                  />
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} sm={4} md={4}>
                    <Button variant="contained" fullWidth onClick={this.sendHeader()}>Send
                      <StartIcon /></Button>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent>
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