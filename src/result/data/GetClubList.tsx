import React, { useState } from 'react';
import '../Result.css';
import Grid from '@mui/material/Grid';
import { getClubList } from '../services/getResultList';
import { TextField, Button } from '@mui/material';

export default function GetClubList() {
    const [clubList, setClubList] = useState('');

    function handleListChange(event: any) {
        getResultList()
    }

    function getResultList() {
        getClubList()
        .then((item) => {
            setClubList(JSON.stringify(item))
            console.log('send success')
        })
        .catch(() => console.log('Failure send'))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="contained" onClick={handleListChange}>
                    Clubs
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="standard-event-id"
                    label="Clubs"
                    helperText="List"
                    name="Event"
                    fullWidth
                    value={clubList}
                    variant="outlined"
                    onChange={handleListChange}
                />
            </Grid>
        </Grid>
    );
}
