import React, { useState, useEffect } from 'react';
import '../Result.css';
import Grid from '@material-ui/core/Grid';
import { getResultList, getAgeList, sendResultList, getEventList } from '../services/getResultList';
import { ResultDataInterface } from '../types/ResultDataInterface';
import { TextField, Button } from '@material-ui/core';

export default function GetResultData() {

    let noResults: ResultDataInterface;

    noResults = {
        eventDefinition:
            { eventNumber: '1', name: 'Name' },
        swimmerResults: [
            {
                name: '',
                lastname: '',
                firstname: '',
                place: ''
            }
        ]
    }

    const ageGroupsValues = [
        {
            value: '0',
            label: '0-0',
        }
    ];


    const [results, setList] = useState(noResults);
    const [ageGroups, setAgegroups] = useState(ageGroupsValues);
    const [eventNames, setEventnames] = useState(ageGroupsValues);
    const [eventNumber, setEventnumber] = useState('0');
    const [ageGroup, setAgegroup] = useState('0');

    useEffect(() => {

        getResultList(eventNumber, ageGroup)
            .then(item => {
                setList(item)
            });

        getAgeList(eventNumber)
            .then(item => {
                setAgegroups(item)
            });

        getEventList()
            .then(item => {
                setEventnames(item)
            });

    }, [eventNumber, ageGroup])

    function handleEventChange(event: any) {
        setEventnumber(event.target.value)
    }

    function handleAgeChange(event: any) {
        setAgegroup(event.target.value)
    }

    function handleSendClick(event: any) {
        sendResultList(eventNumber, ageGroup)
            .then(() => console.log('send success'))
            .catch(() => console.log('Failure send'))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    id="standard-age-id"
                    select
                    label="Age"
                    helperText="Age Class"
                    name="Age"
                    type="text"
                    value={eventNumber}
                    variant="outlined"
                    onChange={handleEventChange}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {eventNames.map((eventValues) => (
                        <option key={eventValues.value} value={eventValues.value}>
                            {eventValues.label}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="standard-age-id"
                    select
                    label="Age"
                    helperText="Age Class"
                    name="Age"
                    type="text"
                    value={ageGroup}
                    variant="outlined"
                    onChange={handleAgeChange}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {ageGroups.map((ageValues) => (
                        <option key={ageValues.value} value={ageValues.value}>
                            {ageValues.label}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="default" onClick={handleSendClick}>
                    Send
                </Button>
            </Grid>
            <Grid item xs={12}>{results.eventDefinition.competition}</Grid>
            <Grid item xs={6}>{results.eventDefinition.name}</Grid>
            <Grid item xs={6}>{'WK: ' + results.eventDefinition.eventNumber}</Grid>
            {results.swimmerResults.map((swimmer, index) => (
                <Grid key={6200 + index} container spacing={0}>
                    <Grid item xs={1} key={1200 + index}>{swimmer.place}</Grid>
                    <Grid item xs={5} key={2200 + index}>{swimmer.firstname + ' ' + swimmer.lastname + ' ' + swimmer.birthdate}</Grid>
                    <Grid item xs={3} key={3200 + index}>{swimmer.name}</Grid>
                    <Grid item xs={3} key={4200 + index}>{swimmer.swimtime}</Grid>
                </Grid>
            ))}
        </Grid>
    );
}
