import React from 'react';
import { Link } from 'react-router-dom';
import Chart from '../components/chart.js';
class Home extends React.Component{

    render(){
        return(
            <div className='homeWrapper'>
                <button onClick={this.props.save}>Save Data</button>
                <Link to='/all'>See all Data</Link>
                <div id='chartWrapper'>
                    <Chart data={this.props.data} />
                </div>
            </div>
        )
    }
}

export default Home