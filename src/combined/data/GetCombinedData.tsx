import React, { useState, useEffect } from 'react';
import '../Combined.css';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import { getCombinedList } from '../service/getCombinedList';
import BasicDocument from '../pdf/Sample';

export interface CombinedInterface {
    firstname: string;
    lastname: string;
    place?: string;
    combinedpoints: string;
    birthdate: string;
    clubname: string;
    combined_name: string;
}


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
    const [combinedNumber, setCombinednumber] = useState('0');

    useEffect(() => {

        getCombinedList('1')
            .then(item => {
                setList(item)
                console.log(item)
            });

    }, [combinedNumber])

    function handleEventChange(event: any) {
        setCombinednumber(event.target.value)
    }

    /*

    function handleSendClick(event: any) {
        sendResultList(eventNumber, ageGroup)
            .then(() => console.log('send success'))
            .catch(() => console.log('Failure send'))
    }
    */

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    id="standard-event-id"
                    label="Combined"
                    helperText="Combined Number"
                    name="Event"
                    value={combinedNumber}
                    variant="outlined"
                    onChange={handleEventChange}
                />
            </Grid>
            <Grid>
                <BasicDocument/>
            </Grid>
            {results.map((swimmer, index) => (
                <Grid container spacing={0}>
                    <Grid item xs={1} key={1000 + index}>{swimmer.place}</Grid>
                    <Grid item xs={3} key={2000 + index}>{swimmer.firstname}</Grid>
                    <Grid item xs={3} key={3000 + index}>{swimmer.lastname}</Grid>
                    <Grid item xs={2} key={4000 + index}>{swimmer.combinedpoints}</Grid>
                </Grid>
            ))}
        </Grid>
    );
}
