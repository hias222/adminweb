import React, { useState, useEffect } from 'react';
import '../Result.css';
import Grid from '@material-ui/core/Grid';
import { getResultList } from '../services/getResultList';

export default function GetResultData() {

    const [list, setList] = useState([{event:1}]);

    useEffect(() => {
        getResultList()
            .then(items => {
                console.log(items)
                setList(items)
            })
    }, [])

    return (
        <Grid>
            Hello
            {list?.map(item => {
                return <div >{item.event}</div>
            })}
        </Grid>
    );
}
