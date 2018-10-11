import React from 'react';
import { Link } from 'react-router-dom';
import Chart from '../components/chart.js';

class Alldata extends React.Component{
    render(){
        return(
            <div className='allWrapper'>
                <Link to='/'>See Current Data</Link>
                <div id='chartWrapper'>
                    <Chart data={this.props.data} />
                </div>
            </div>
        )
    }
}

export default Alldata