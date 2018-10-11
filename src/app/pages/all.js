import React from 'react';
import { Link } from 'react-router-dom';
import Chart from '../components/chart.js';

const All = (props)=>{
    return(
        <div className='contentWrapper'>
            <h1 className='title'>Table 2</h1>
            <p className='subHeading'>All Saved Data</p>
            <div id='chartWrapper'>
                <Chart data={props.data} />
            </div>
            <Link className='link' to='/'>See Current Data</Link>
        </div>
    )
}

export default All