import React from 'react';
import { Link } from 'react-router-dom';
import Chart from '../components/chart.js';

const Current = (props)=>{
    return(
        <div className='contentWrapper'>
            <h1 className='title'>Table 1</h1>
            <p className='subHeading'>Current Data</p>
            <div id='chartWrapper'>
                <Chart data={props.data} />
            </div>
            <a className='link' onClick={props.save}>Save Data</a>
            <Link className='link' to='/all'>See all Data</Link>
        </div>
    )
}

export default Current