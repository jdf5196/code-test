import React from 'react';
import Home from './pages/home.js';
import {Route} from 'react-router-dom';

class App extends React.Component{
    render(){
        return(
            <div id='appWrapper'>
                <Route exact path='/' component={Home} />
            </div>
        )
    }
}

export default App