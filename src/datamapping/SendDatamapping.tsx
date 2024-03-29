import * as React from 'react';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

interface Props {
    event_type: string;
}

interface State {
    event_type: string;
};

// FINALE: 'FIN',
// VORLAEUFE: 'PRE',
// DIREKT: 'TIM'


export default class SendDatamapping extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            event_type: ""
        };
        //this.getStateDatamapping = this.getStateDatamapping.bind(this);
    }

    private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-mqtt" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-mqtt"

    sendFinal = (message: string) => (event: any) => {
        console.log(this.backendConnect + " " + message)
        fetch(this.backendConnect, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "message": "configuration event_type " + message
            })
        })
            .then(() => this.getStateDatamapping())
            .catch(console.log)
    };

    private backendConfig = process.env.REACT_APP_DATAMAPPING_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL;

    getStateDatamapping() {
        fetch(this.backendConfig + "/datamapping/configuration")
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    event_type: data.event_type
                })
            })
            .catch(console.log)

        console.log("update from " + this.backendConnect)
    }

    componentDidMount() {
        this.getStateDatamapping()
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={3}>
                    <Button variant="contained" onClick={this.sendFinal("ALL")}>ALL
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" onClick={this.sendFinal("FIN")}>Finale
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" onClick={this.sendFinal("PRE")}>Vorläufe
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" onClick={this.sendFinal("TIM")}>Normal
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <p>Type on backend: {this.state.event_type}</p>
                </Grid>
            </Grid>
        )
    };

};