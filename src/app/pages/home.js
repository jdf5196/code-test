import React from 'react';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ws: {},
            text: "Home"
        }
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
            console.log(e.data)
            this.setState({
                text: e.data
            })
        }
    }
    render(){
        return(
            <div className='homeWrapper'>
                <p>{this.state.text}</p>
            </div>
        )
    }
}

export default Home