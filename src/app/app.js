import React from 'react';
import Home from './pages/home.js';
import Alldata from './pages/alldata.js';
import {Route} from 'react-router-dom';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ws: {},
            data: {
                currentData: [],
                savedData: [],
                isCurrentDataSaved: false
            }
        }
        this.saveData = this.saveData.bind(this);
    }
    componentWillMount(){
        const host = location.origin.replace(/^http/, 'ws')
        const ws = new WebSocket(host);
        this.setState({
            ws: ws
        });
    }
    componentDidMount(){
        this.state.ws.onmessage = (e)=>{
            let data = JSON.parse(e.data);
            console.log('Data received')
            console.log(data.currentData)
            this.setState({
                data: data
            });
        }
    }
    saveData(){
        if(!this.state.data.isCurrentDataSaved){
            let data = {data: this.state.data.currentData, type:"save"};
            this.state.ws.send(JSON.stringify(data));
        }
    }
    render(){
        return(
            <div id='appWrapper'>
                <Route exact path='/' render={()=> <Home data={this.state.data.currentData} save={this.saveData}/>} />
                <Route exact path='/all' render={()=> <Alldata data={this.state.data.savedData} />} />
            </div>
        )
    }
}

export default App