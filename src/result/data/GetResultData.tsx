import React, { useState, useEffect } from 'react';
import '../Result.css';
import Grid from '@material-ui/core/Grid';
import { getResultList } from '../services/getResultList';
import { ResultDataInterface } from '../types/ResultDataInterface';

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

    const [results, setList] = useState(noResults);

    useEffect(() => {
        getResultList()
            .then(item => {
                setList(item)
            })
    }, [])

    return (
        <Grid>
            <Grid>{results.eventDefinition.name}</Grid>
            <Grid>{results.eventDefinition.eventNumber}</Grid>
            {results.swimmerResults.map((swimmer,index) => (
                <Grid key={index}>{swimmer.place + ' ' + swimmer.swimmerName}</Grid>
            ))}
        </Grid>
    );
}
