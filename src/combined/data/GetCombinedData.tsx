import React, { useState, useEffect } from 'react';
import '../Combined.css';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import { getCombinedList, getDefinitionList, sendCombinedList } from '../service/getCombinedList';
import CertsDocument from '../pdf/PDFCerts';
import { CombinedInterface } from '../types/CombinedDataInterface';
import ResultsDocument from '../pdf/PDFResults';

export default function GetCombinedData() {

    let noResults: CombinedInterface[];

    noResults = [{
        'firstname': '',
        'lastname': '',
        'combinedpoints': '',
        birthdate: '',
        clubname: '',
        combined_name: '',
    }]

    const [results, setList] = useState(noResults);
    const [showDetails, setShowDetails] = useState(true);
    const [showCerts, setShowCerts] = useState(false);
    const [showErgebnispdf, setShowErgebnispdf] = useState(false);

    const [combinedID, setCombinedid] = useState(1);
    const [combinedPlace, setCombinedPlace] = useState(0);

    const [combinedDefinition, setCombinedDefinition] = useState([{ value: '1', label: 'undefined' }]);

    const combinedPlaces = [
        { value: '1', label: 'all' },
        { value: '2', label: 'without 1' },
        { value: '3', label: 'without 2' },
        { value: '4', label: 'without 3' },
        { value: '5', label: 'without 4' },
        { value: '6', label: 'without 5' }
    ]

    useEffect(() => {

        getCombinedList(combinedID.toString(), combinedPlace.toString())
            .then(item => {
                setList(item)
                //console.log(item)
            });

        getDefinitionList()
            .then(item => {
                setCombinedDefinition(item)
            });

    }, [combinedID, combinedPlace])

    function handleDefChange(event: any) {
        setCombinedid(event.target.value)
    }

    function handlePlaceChange(event: any) {
        setCombinedPlace(event.target.value)
    }

    function handleCertClick(event: any) {
        setShowDetails(false)
        setShowErgebnispdf(false)
        setShowCerts(true)
    }

    function handleSendClick(event: any) {
        sendCombinedList(combinedID.toString(), combinedPlace.toString())
            .then(() => console.log('send success'))
            .catch(() => console.log('Failure send'))
    }

    function handleDetailsClick(event: any) {
        setShowErgebnispdf(false)
        setShowDetails(true)
        setShowCerts(false)

        getCombinedList(combinedID.toString(), combinedPlace.toString())
            .then(item => {
                setList(item)
                //console.log(item)
            });
    }

    function handleErgebnisClick(event: any) {
        setShowErgebnispdf(true)
        setShowDetails(false)
        setShowCerts(false)
    }

    function getShowData() {
        if (showDetails) {
            return <Grid item xs={12}>
                {results.map((swimmer, index) => (
                    <div>
                        <Grid key={6000 + index} container spacing={0}>
                            <Grid item xs={1} key={1000 + index}>{swimmer.place}</Grid>
                            <Grid item xs={3} key={2000 + index}>{swimmer.firstname}</Grid>
                            <Grid item xs={3} key={3000 + index}>{swimmer.lastname}</Grid>
                            <Grid item xs={2} key={5000 + index}>{swimmer.birthdate}</Grid>
                            <Grid item xs={2} key={4000 + index}>{swimmer.combinedpoints}</Grid>
                        </Grid>

                        {swimmer.data?.map((data, index) =>
                            <Grid key={6500 + index} container spacing={0}>
                                <Grid item xs={1} key={7800 + index}>{data.event}</Grid>
                                <Grid item xs={2} key={8800 + index}>{data.distance}</Grid>
                                <Grid item xs={3} key={9800 + index}>{data.swimstyle}</Grid>
                                <Grid item xs={3} key={10800 + index}>{data.points}</Grid>
                                <Grid item xs={3} key={11800 + index}>{data.swimtime}</Grid>
                            </Grid>
                        )}

                    </div>
                ))}
            </Grid>
        } else if (showErgebnispdf) {
            return <Grid>
                <ResultsDocument certData={results} />
            </Grid>
        }
        else if (showCerts) {
            return <Grid>
                <CertsDocument certData={results} />
            </Grid>
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField
                    id="standard-def-id"
                    select
                    label="Combined"
                    helperText="Definitions"
                    name="Def"
                    type="text"
                    value={combinedID}
                    variant="outlined"
                    onChange={handleDefChange}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {combinedDefinition.map((defs) => (
                        <option key={defs.value} value={defs.value}>
                            {defs.label}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="standard-place-id"
                    select
                    label="Place"
                    helperText="Places"
                    name="Place"
                    type="text"
                    value={combinedPlace}
                    variant="outlined"
                    onChange={handlePlaceChange}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {combinedPlaces.map((defs) => (
                        <option key={defs.value} value={defs.value}>
                            {defs.label}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="default" onClick={handleDetailsClick}>
                    List
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" color="default" onClick={handleSendClick}>
                    Send
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="default" onClick={handleCertClick}>
                    Urkunden (PDF)
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="default" onClick={handleErgebnisClick}>
                    Ergbebnis (PDF)
                </Button>
            </Grid>

            {getShowData()}
        </Grid>
    );
}
