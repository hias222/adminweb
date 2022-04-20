import React, { useState, useEffect } from 'react';
import '../Combined.css';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import { getCombinedList, getDefinitionList } from '../service/getCombinedList';
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
    const [showpdf, setShowpdf] = useState(true);
    const [buttonPDF, setButtonpdf] = useState('PDF');
    const [combinedID, setCombinedid] = useState(1);

    const [combinedDefinition, setCombinedDefinition] = useState([{value: '1', label: 'undefined'}]);

    useEffect(() => {

        getCombinedList(combinedID.toString())
            .then(item => {
                setList(item)
                //console.log(item)
            });

        getDefinitionList()
            .then(item => {
                setCombinedDefinition(item)
            });

    }, [combinedID])

    function handleDefChange(event: any) {
        setCombinedid(event.target.value)
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
                <CertsDocument certData={results} />
            </Grid>
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
                <Button variant="contained" color="default" onClick={handlePDFClick}>
                    {buttonPDF}
                </Button>
            </Grid>
            {getShowData()}
        </Grid>
    );
}
