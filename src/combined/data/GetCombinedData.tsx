import React, { useState, useEffect } from 'react';
import '../Combined.css';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import { getCombinedList } from '../service/getCombinedList';
import CertsDocument from '../pdf/PDFCerts';
import { CombinedInterface } from '../types/CombinedDataInterface';

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
    const [showpdf, setShowpdf] = useState(true);
    const [buttonPDF, setButtonpdf] = useState('PDF');

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

    function handlePDFClick(event: any) {
        if (showpdf) {
            setShowpdf(false)
            setButtonpdf('Details')
        } else {
            setShowpdf(true)
            setButtonpdf('PDF')
        }
    }

    function getShowData() {
        if (showpdf) {
            return <Grid item xs={12}>
                {results.map((swimmer, index) => (
                    <Grid container spacing={0}>
                        <Grid item xs={1} key={1000 + index}>{swimmer.place}</Grid>
                        <Grid item xs={3} key={2000 + index}>{swimmer.firstname}</Grid>
                        <Grid item xs={3} key={3000 + index}>{swimmer.lastname}</Grid>
                        <Grid item xs={2} key={4000 + index}>{swimmer.combinedpoints}</Grid>
                    </Grid>
                ))}
            </Grid>
        } else {
            return <Grid>
                <CertsDocument certData={results}/>
            </Grid>
        }
    }

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
                <Button variant="contained" color="default" onClick={handlePDFClick}>
                    {buttonPDF}
                </Button>
            </Grid>
            {getShowData()}
        </Grid>
    );
}
