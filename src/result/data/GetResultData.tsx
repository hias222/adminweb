import React, { useState, useEffect } from 'react';
import '../Result.css';
import Grid from '@material-ui/core/Grid';
import { getResultList, getAgeList } from '../services/getResultList';
import { ResultDataInterface } from '../types/ResultDataInterface';
import { TextField } from '@material-ui/core';

export default function GetResultData() {

    let noResults: ResultDataInterface;

    noResults = {
        eventDefinition:
            { eventNumber: '1', name: 'Name' },
        swimmerResults: [
            {
                clubId: '',
                clubName: '',
                swimmerName: '',
                endTime: '',
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

    }, [eventNumber, ageGroup])

    function handleEventChange(event: any) {
        setEventnumber(event.target.value)
    }

    function handleAgeChange(event: any) {
        setAgegroup(event.target.value)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    id="standard-event-id"
                    label="Event"
                    helperText="Event Number"
                    name="Event"
                    value={eventNumber}
                    variant="outlined"
                    onChange={handleEventChange}
                />
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
            <Grid>{results.eventDefinition.name}</Grid>
            <Grid>{results.eventDefinition.eventNumber}</Grid>
            {results.swimmerResults.map((swimmer, index) => (
                <Grid key={index}>{swimmer.place + ' ' + swimmer.swimmerName}</Grid>
            ))}
        </Grid>
    );
}
