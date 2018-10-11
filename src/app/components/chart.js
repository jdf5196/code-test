import React from 'react';
import * as d3 from "d3";

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        this.removeChart = this.removeChart.bind(this);
        this.drawChart = this.drawChart.bind(this);
    }
    componentWillMount(){
        this.setState({
            data: this.props.data
        });
    }
    componentWillReceiveProps(nextProps){
        this.removeChart();
        this.setState({
            data: nextProps.data
        })
        this.drawChart(nextProps.data);
    }
    removeChart(){
        const chart = document.getElementById('chart');
        while(chart.hasChildNodes()){
            chart.removeChild(chart.lastChild);
        }
    }
    drawChart(newChartData){
        const margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
        const svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
        x.domain([0, 100]);
        y.domain([0, 100]);

        svg.selectAll("dot")
            .data(newChartData).enter().append("circle")
            .attr("r", 3)
            .attr("cx", d=>x(d.x))
            .attr("cy", d=> y(d.y));
        
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
        svg.append("g").call(d3.axisLeft(y));
    }
    componentDidMount(){
       this.drawChart(this.state.data);
    }
    render(){
        return(
            <div id='chart' />
        )
    }

}

export default Chart;