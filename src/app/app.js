import React from 'react';
import Current from './pages/current.js';
import All from './pages/all.js';
import Toastr from 'toastr';
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
        // Connect to websocket server
        const host = location.origin.replace(/^http/, 'ws')
        const ws = new WebSocket(host);
        this.setState({
            ws: ws
        });
    }
    componentDidMount(){
        // Set the data to the component state when received by the server
        this.state.ws.onmessage = (e)=>{
            let data = JSON.parse(e.data);
            console.log('Data received')
            this.setState({
                data: data.data
            });
            if(data.type === 'save'){
                Toastr.options.positionClass = 'toast-top-center';
                Toastr.info("This data has been saved.")
            }
        }
    }
    saveData(){
        // Tell the server to save the current data
        if(!this.state.data.isCurrentDataSaved){
            let data = {data: this.state.data.currentData, type:"save"};
            this.state.ws.send(JSON.stringify(data));
        }else{
            Toastr.options.positionClass = 'toast-top-center';
            Toastr.error("This data is already saved.")
        }
    }
    render(){
        return(
            <div id='appWrapper'>
                <Route exact path='/' render={()=> <Current data={this.state.data.currentData} save={this.saveData}/>} />
                <Route exact path='/all' render={()=> <All data={this.state.data.savedData} />} />
            </div>
        )
    }
}

export default App