import React from 'react';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ws: {},
            text: "Home"
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
            this.setState({
                text: e.data
            })
        }
    }
    saveData(){
        let data = {data: JSON.parse(this.state.text), type:"save"};
        this.state.ws.send(JSON.stringify(data));
    }
    render(){
        return(
            <div className='homeWrapper'>
                <p>{this.state.text}</p>
                <hr />
                <button onClick={this.saveData}>Save Data</button>
            </div>
        )
    }
}

export default Home